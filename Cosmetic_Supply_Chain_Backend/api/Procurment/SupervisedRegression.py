from flask import request, jsonify
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler
import os
from utils.JWT_token import JWTToken

class RandomForestAPI:
    def __init__(self, app):
        self.app = app
        current_dir = os.path.dirname(os.path.abspath(__file__))

        # Load RandomForestRegressor model
        model_path = os.path.join(current_dir, 'models/randomforest.pkl')
        self.model = joblib.load(model_path)

        # Load LabelEncoder for delay cause
        encoder_path = os.path.join(current_dir, 'models/label_encoder_delay_cause.pkl')
        self.le_delay_cause = joblib.load(encoder_path)

        # Load StandardScaler from a file
        scaler_path = os.path.join(current_dir, 'models/scaler.pkl')
        self.scaler = joblib.load(scaler_path)

        self.register_routes()

    def register_routes(self):
        """Register all API routes"""
        self.app.route('/rf', methods=['POST'])(self.predict_delay_days)

    def predict_delay_days(self):
        """Predict delay days using RandomForest model for admin or procurement roles"""
        try:
            # Verify JWT token
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'error': 'Missing authorization token'}), 401
            
            payload = JWTToken.verify_token(token)
            if not payload:
                return jsonify({'error': 'Invalid or expired token'}), 401

            # Check if user role is admin or procurement
            role = payload.get('role')
            if role not in ['admin', 'procurment']:
                return jsonify({'error': 'You do not have permission'}), 403

            # Get and validate input
            data = request.json
            try:
                quantity = float(data['Quantity'])
                avg_delay = float(data['supplier_avg_delay'])
                price = float(data['Price__USD_per_unit'])
                delay_cause = data['Delay_Cause']
            except KeyError as ke:
                return jsonify({'error': f'Missing field: {str(ke)}'}), 400
            except ValueError:
                return jsonify({'error': 'All numerical fields must be valid numbers.'}), 400

            # Encode the delay cause
            if delay_cause not in self.le_delay_cause.classes_:
                return jsonify({'error': f"Unknown delay cause: {delay_cause}"}), 400

            delay_cause_encoded = self.le_delay_cause.transform([delay_cause])[0]

            # Prepare features
            features = np.array([[quantity, avg_delay, price, delay_cause_encoded]])
            X_scaled = self.scaler.transform(features)

            # Predict
            prediction = self.model.predict(X_scaled)[0]

            return jsonify({
                'predicted_delay_days': round(float(prediction), 2)
            }), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
