from flask import request, jsonify
import joblib
import numpy as np
import os
from utils.JWT_token import JWTToken

class SVCApi:
    def __init__(self, app):
        self.app = app
        current_dir = os.path.dirname(os.path.abspath(__file__))

        # Define paths
        model_path = os.path.join(current_dir, 'models/fine_tuned_svc_model.pkl')
        scaler_path = os.path.join(current_dir, 'models/scaler.pkl')
        encoder_path = os.path.join(current_dir, 'models/label_encoder_delay_cause.pkl')

        # Load artifacts
        self.model = joblib.load(model_path)
        self.scaler = joblib.load(scaler_path)  # StandardScaler used during training
        self.le_delay_cause = joblib.load(encoder_path)  # LabelEncoder used for Delay_Cause

        self.register_routes()

    def register_routes(self):
        """Register all API routes"""
        self.app.route('/svc', methods=['POST'])(self.predict)

    def predict(self):
        """Predict delay likelihood using SVC model for admin or procurment roles"""
        try:
            # Verify JWT token
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'error': 'Missing authorization token'}), 401
            
            payload = JWTToken.verify_token(token)
            if not payload:
                return jsonify({'error': 'Invalid or expired token'}), 401
            
            # Check if user role is admin or procurment
            role = payload.get('role')
            if role not in ['admin', 'procurment']:
                return jsonify({'error': 'You do not have permission'}), 403

            data = request.json
            delay_cause_str = data['Delay_Cause']  # This should be a string
            delay_cause_encoded = self.le_delay_cause.transform([delay_cause_str])[0]

            features = [
                data['Quantity'],
                data['supplier_avg_delay'],
                data['Price__USD_per_unit'],
                delay_cause_encoded
            ]

            # Reshape and scale
            X = np.array(features).reshape(1, -1)
            X_scaled = self.scaler.transform(X)

            # Predict
            prediction = self.model.predict(X_scaled)[0]
            probability = self.model.predict_proba(X_scaled)[0][1]

            return jsonify({
                'prediction': int(prediction),
                'probability_of_delay': round(float(probability), 4)
            }), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500