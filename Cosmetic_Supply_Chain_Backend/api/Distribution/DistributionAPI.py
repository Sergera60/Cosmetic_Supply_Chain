import os
import re
import joblib
import numpy as np
import pandas as pd
from flask import request, jsonify
from sklearn.preprocessing import LabelEncoder

from utils.JWT_token import JWTToken


class DistributionAPI:
    def __init__(self, app):
        current_dir = os.path.dirname(os.path.abspath(__file__))

        # Load models
        self.xgb_model = joblib.load(os.path.join(current_dir, 'models/xgb_model.pkl'))
        self.gbr_model = joblib.load(os.path.join(current_dir, 'models/gradient_boosting_model.pkl'))
        self.gbr_encoders = joblib.load(os.path.join(current_dir, 'models/label_encoders.pkl'))

        # Feature configuration
        self.gbr_features = [
            'Distance_km', 'Estimated_Time_Hours', 'Quantity', 'Price_TND',
            'Customer_Satisfaction_Score', '_Product_Damaged',
            'DeliveryCompany', 'Order_ShippingAddress'
        ]
        self.xgb_features = ['Price', 'Average_Rating', 'Sensitive', 'No_Light_Storage', 'Storage_Type', 'Size_Oz', 'Brand', 'Categorie']
        self.xgb_label_encoders = {}

        self.register_routes(app)

    def register_routes(self, app):
        app.route('/distribution/defect', methods=['POST'])(self.predict_defect)
        app.route('/distribution/regression', methods=['POST'])(self.predict_delivery)

    def authorize(self):
        token = request.headers.get('Authorization')
        if not token:
            return None, jsonify({'error': 'Missing authorization token'}), 401

        payload = JWTToken.verify_token(token)
        if not payload:
            return None, jsonify({'error': 'Invalid or expired token'}), 401

        role = payload.get('role')
        if role not in ['admin', 'distribution']:
            return None, jsonify({'error': 'You do not have permission'}), 403

        return payload, None, None

    def preprocess_xgb(self, data):
        df = pd.DataFrame([data])
        if 'Sensible' in df.columns:
            df['Sensitive'] = df['Sensible'].map({'Oui': 1, 'Non': 0, None: 0})
        if 'Stocker_sans_lumiere' in df.columns:
            df['No_Light_Storage'] = df['Stocker_sans_lumiere'].map({'Oui': 1, 'Non': 0, None: 0})
        if 'Temperature' in df.columns:
            df['Storage_Type'] = df['Temperature'].apply(
                lambda x: 'Fridge' if isinstance(x, str) and 'Réfrigéré' in x else 'Ambient'
            )

        def extract_size(size_str):
            match = re.search(r'(\d+(\.\d+)?)\s*(oz|ml)', str(size_str))
            if match:
                size = float(match.group(1))
                unit = match.group(3).lower()
                return size if unit == 'oz' else size / 29.5735
            return None

        if 'Size_Volume' in df.columns:
            df['Size_Oz'] = df['Size_Volume'].apply(extract_size)

        categorical_cols = ['Brand', 'Categorie', 'Storage_Type']
        for col in categorical_cols:
            if col in df.columns:
                if col not in self.xgb_label_encoders:
                    le = LabelEncoder()
                    df[col] = le.fit_transform(df[col].astype(str))
                    self.xgb_label_encoders[col] = le
                else:
                    le = self.xgb_label_encoders[col]
                    df[col] = df[col].map(lambda x: le.transform([str(x)])[0] if str(x) in le.classes_ else -1)

        return df[self.xgb_features]

    def predict_defect(self):
        _, error_response, status_code = self.authorize()
        if error_response:
            return error_response, status_code

        try:
            data = request.get_json()
            processed_data = self.preprocess_xgb(data)
            prediction = self.xgb_model.predict(processed_data)
            probability = self.xgb_model.predict_proba(processed_data)[0].tolist()
            return jsonify({'prediction': int(prediction[0]), 'probability': probability})
        except Exception as e:
            return jsonify({'error': str(e)}), 400

    def predict_delivery(self):
        _, error_response, status_code = self.authorize()
        if error_response:
            return error_response, status_code

        try:
            data = request.get_json()
            df = pd.DataFrame([data])

            missing = [f for f in self.gbr_features if f not in df.columns]
            if missing:
                return jsonify({'error': f'Missing features: {missing}'}), 400

            for col, le in self.gbr_encoders.items():
                if col in df.columns:
                    df[col] = le.transform(df[col].astype(str))

            prediction = self.gbr_model.predict(df[self.gbr_features])[0]
            return jsonify({'predicted_Real_Time_Hours': round(prediction, 2)})
        except Exception as e:
            return jsonify({'error': str(e)}), 500
