import pandas as pd
import joblib
import os
from datetime import timedelta
from flask import request, jsonify
from utils.JWT_token import JWTToken

class SarimaAPI:
    def __init__(self, app):
        self.app = app
        # Load the SARIMA model
        current_dir = os.path.dirname(os.path.abspath(__file__))
        model_path = os.path.join(current_dir, 'models\\sarima_model.pkl')
        self.sarima_model = joblib.load(model_path)
        self.register_routes()

    def register_routes(self):
        """Register all API routes"""
        self.app.route('/sarima', methods=['POST'])(self.forecast)

    def forecast(self):
        """Execute SARIMA model forecast for admin or procurment roles"""
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
            steps = data.get('steps', 6)  # Default to 6 months if not provided

            # Get the current date
            current_date = pd.to_datetime('today')

            # Forecast
            forecast_result = self.sarima_model.forecast(steps=steps)

            # Generate the forecast dates (monthly frequency)
            forecast_dates = [current_date + timedelta(days=30 * i) for i in range(1, steps + 1)]

            # Prepare response with forecasted dates and values
            forecast_data = [{"date": str(forecast_dates[i].date()), "forecasted_delay_days": forecast_result[i]} for i in range(steps)]

            return jsonify({
                'forecast': forecast_data
            }), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500