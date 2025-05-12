import os
import joblib
import pandas as pd
from flask import request, jsonify
from utils.JWT_token import JWTToken

class ProductionDelayAPI:
    def __init__(self, app):
        current_dir = os.path.dirname(os.path.abspath(__file__))
        self.pipeline = joblib.load(os.path.join(current_dir, 'models/produitdelayed_model.pkl'))
        self.encoder = joblib.load(os.path.join(current_dir, 'models/categorie_brand_encoder.pkl'))
        self.required_features = ['Categorie', 'Brand', 'Price']
        self.register_routes(app)

    def register_routes(self, app):
        app.add_url_rule(
            "/production/delay",
            view_func=self.predict,
            methods=["POST"],
            endpoint="production_delay_predict"
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
            missing = [key for key in self.required_features if key not in data]
            if missing:
                return jsonify({'error': f"Les champs suivants sont manquants : {', '.join(missing)}"}), 400

            # Validate and format data
            try:
                price = float(data['Price'])
            except:
                return jsonify({'error': 'Price must be a numeric value'}), 400

            input_df = pd.DataFrame([{
                'Categorie': data['Categorie'],
                'Brand': data['Brand'],
                'Price': price
            }])

            # Use pipeline directly (it includes encoder + classifier)
            prediction = self.pipeline.predict(input_df)[0]
            label = "Retardé" if prediction == 1 else "À l'heure"

            return jsonify({
                'prediction': int(prediction),
                'label': label
            })

        except Exception as e:
            return jsonify({'error': f"Erreur lors de la prédiction : {str(e)}"}), 500
