import os
import joblib
import pandas as pd
import numpy as np
from flask import request, jsonify
from utils.JWT_token import JWTToken

class PerformanceAPI:
    def __init__(self, app):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        self.model = joblib.load(os.path.join(current_dir, 'models/performance_model.pkl'))
        self.scaler = joblib.load(os.path.join(current_dir, 'models/scaler.pkl'))
        self.le_issues = joblib.load(os.path.join(current_dir, 'models/le_issues.pkl'))
        self.le_reason = joblib.load(os.path.join(current_dir, 'models/le_reason.pkl'))
        self.required_features = ['price_zscore', 'Issues_Found', 'Reason_x']
        self.register_routes(app)

    def register_routes(self, app):
        app.add_url_rule(
            "/production/performance",
            view_func=self.predict,
            methods=["POST"],
            endpoint="maintenance_performance_predict"
        )

    def authorize(self):
        token = request.headers.get('Authorization')
        if not token:
            return None, jsonify({'error': 'Missing authorization token'}), 401

        payload = JWTToken.verify_token(token)
        if not payload:
            return None, jsonify({'error': 'Invalid or expired token'}), 401

        role = payload.get('role')
        if role not in ['admin', 'production']:
            return None, jsonify({'error': 'You do not have permission'}), 403

        return payload, None, None

    def predict(self):
        _, error_response, status = self.authorize()
        if error_response:
            return error_response, status

        try:
            data = request.get_json()

            # Check for missing fields
            missing = [key for key in self.required_features if key not in data]
            if missing:
                return jsonify({'error': f"Missing fields: {', '.join(missing)}"}), 400

            try:
                price_zscore = float(data['price_zscore'])
            except ValueError:
                return jsonify({'error': 'price_zscore must be a numeric value'}), 400

            # Encode categorical features
            try:
                issues_encoded = self.le_issues.transform([data['Issues_Found']])[0]
                reason_encoded = self.le_reason.transform([data['Reason_x']])[0]
            except ValueError as e:
                return jsonify({'error': f'Unknown category in input: {str(e)}'}), 400

            # Create input array and scale
            input_array = np.array([[price_zscore, issues_encoded, reason_encoded]])
            input_scaled = self.scaler.transform(input_array)

            # Predict
            prediction = int(self.model.predict(input_scaled)[0])
            label_mapping = {0: "Bad", 1: "Average", 2: "Good"}
            label = label_mapping.get(prediction, "Unknown")

            return jsonify({
                'prediction': prediction,
                 'label': label
            })

        except Exception as e:
            return jsonify({'error': f"Prediction error: {str(e)}"}), 500
