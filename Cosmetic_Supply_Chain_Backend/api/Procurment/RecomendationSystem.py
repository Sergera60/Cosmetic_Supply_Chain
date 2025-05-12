import pandas as pd
import numpy as np
from sqlalchemy import create_engine
from flask import jsonify, request
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
import joblib
from utils.JWT_token import JWTToken

class RecommendationAPI:
    def __init__(self, app):
        self.app = app
        # Configuration de connexion
        USER = "postgres"
        PASSWORD = "159753"
        HOST = "localhost"
        PORT = "5432"
        DB = "SupplyChain_DW"

        # Création de l'engine SQLAlchemy
        self.engine = create_engine(f'postgresql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB}')
        query = """
        SELECT 
            f."SupID_FK" AS Supplier_ID,
            f."id_MP_FK" AS MP_ID,
            f."Quantity",
            f."Delay_Days",
            f."Ware_ID_FK" AS Warehouse_ID,
            s."Average_Delai__days" AS supplier_avg_delay,
            s."Supplier_Name",
            s."Delay_Cause",
            s."Day_of_Delay",
            mp."Price__USD_per_unit",
            mp."Product_Name",
            mp."Solubility"
        FROM 
            "Fact_Procurment" f
        JOIN 
            "Dim_Supplier" s ON f."SupID_FK" = s."SupID_PK"
        JOIN 
            "DIM_MP" mp ON f."id_MP_FK" = mp."id_MP_PK"
        """

        # Load and process data
        self.df = pd.read_sql_query(query, self.engine)
        self.df['AvgDelay_DelayDiff'] = self.df['supplier_avg_delay'] - self.df['Delay_Days']
        self.df['IsLate'] = self.df['AvgDelay_DelayDiff'].apply(lambda x: 1 if x < 0 else 0)

        # Features to use
        cos_features = ['supplier_avg_delay', 'Delay_Days', 'Price__USD_per_unit', 'IsLate']
        X_cos = self.df[cos_features]
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X_cos)

        # Ideal profile per mp_id
        ideal_profiles = self.df.groupby('mp_id')[cos_features].mean()
        ideal_scaled = scaler.transform(ideal_profiles)

        # Compute cosine similarity
        similarity_scores = cosine_similarity(X_scaled, ideal_scaled)
        best_indices = similarity_scores.argmax(axis=0)
        self.best_cosine_df = self.df.iloc[best_indices].copy()
        self.best_cosine_df['Cosine_Similarity_Score'] = similarity_scores[best_indices, range(len(best_indices))]

        self.register_routes()

    def register_routes(self):
        """Register all API routes"""
        self.app.route('/recommendations', methods=['GET'])(self.get_recommendations)

    def get_recommendations(self):
        """Return supplier recommendations for admin or procurment roles"""
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

            # Sort by similarity score and remove duplicates
            cleaned_df = (
                self.best_cosine_df
                .sort_values(by='Cosine_Similarity_Score', ascending=False)
                .drop_duplicates(subset=['Product_Name', 'Supplier_Name'], keep='first')
            )

            # Convert to list of dicts
            results = cleaned_df[['Product_Name', 'Supplier_Name', 'Cosine_Similarity_Score']].to_dict(orient='records')
            return jsonify(results), 200

        except Exception as e:
            return jsonify({'error': str(e)}), 500
