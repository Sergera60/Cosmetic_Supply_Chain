import os
import joblib
import numpy as np
import pandas as pd
from flask import request, jsonify
from utils.JWT_token import JWTToken  # Ensure this is correctly imported from your project

class InventoryAPI:
    def __init__(self, app):
        base_path = os.path.dirname(os.path.abspath(__file__))

        # Load models
        self.risk_model = joblib.load(os.path.join(base_path, 'models/model.pkl'))         # classification
        self.final_stock_model = joblib.load(os.path.join(base_path, 'models/model1.pkl')) # regression

        self.features_risk = ['Temperature', 'Stock_Initial', 'Stock_Entrant', 'Stock_Sortant']
        self.register_routes(app)

    def register_routes(self, app):
        app.route("/inventory/risque", methods=["POST"])(self.predict_risk)
        app.route("/inventory/final-stock", methods=["POST"])(self.predict_final_stock)

    def authorize(self):
        token = request.headers.get('Authorization')
        if not token:
            return None, jsonify({'error': 'Missing authorization token'}), 401

        payload = JWTToken.verify_token(token)
        if not payload:
            return None, jsonify({'error': 'Invalid or expired token'}), 401

        role = payload.get('role')
        if role not in ['admin', 'inventory']:
            return None, jsonify({'error': 'You do not have permission'}), 403

        return payload, None, None

    def predict_risk(self):
        _, error_response, status = self.authorize()
        if error_response:
            return error_response, status

        try:
            data = request.get_json()
            input_data = [data.get(feature, 0) for feature in self.features_risk]
            input_df = pd.DataFrame([input_data], columns=self.features_risk)

            prediction = self.risk_model.predict(input_df)[0]
            proba = self.risk_model.predict_proba(input_df)[0].tolist()

            return jsonify({
                "prediction": int(prediction),
                "probabilities": {
                    "Pas_Risque (0)": proba[0],
                    "A_Risque (1)": proba[1]
                }
            })
        except Exception as e:
            return jsonify({"error": str(e)}), 400

    def predict_final_stock(self):
        _, error_response, status = self.authorize()
        if error_response:
            return error_response, status

        try:
            data = request.get_json()
            required_features = ["Stock_Entrant", "Stock_Sortant", "Produits_Endommages", "capacity"]

            features = [float(data.get(f, 0)) for f in required_features]
            features_array = np.array(features).reshape(1, -1)

            prediction = self.final_stock_model.predict(features_array)[0]

            return jsonify({
                "prediction": round(prediction, 2)
            })

        except Exception as e:
            return jsonify({
                "error": str(e),
                "message": "Make sure all fields are numeric: Stock_Entrant, Stock_Sortant, Produits_Endommages, capacity"
            }), 400
