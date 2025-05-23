from flask import Flask
from flask_cors import CORS
from config.DatabaseConfig import DatabaseConfig
from api.UserAPi import UserAPI
from api.Procurment.TimeSeries import SarimaAPI
from dao.UserDAO import UserDAO
from models.User import User
from api.Procurment.SupervisedRegression import RandomForestAPI
from api.Procurment.RecomendationSystem import RecommendationAPI
from api.Procurment.SupervisedClassification import SVCApi
from api.Distribution.DistributionAPI import DistributionAPI
from api.Inventory.InventoryAPI import InventoryAPI
from api.Production.performance_api import PerformanceAPI
from api.Production.produitdelayed_api import ProductionDelayAPI
from app_extensions import db ,mail
from api.ChatBotAPI import chatbot_bp

def create_default_admin_user(db_config: DatabaseConfig):
    """Create a default admin user if it doesn’t exist"""
    user_dao = UserDAO(db_config)
    
    # Check if admin user exists
    if not user_dao.get_user_by_email("admin@admin.com"):
        # Create default admin user
        admin_user = User(
            email="admin@admin.com",
            password="adminadmin",  # Will be hashed by UserDAO
            role="admin"
        )
        user_id = user_dao.create_user(admin_user)
        print(f"Default admin user created with ID: {user_id}")
    else:
        print("Default admin user already exists")

def main():
    # Initialize database configuration
    db_config = DatabaseConfig()
    
    # Create default admin user
    create_default_admin_user(db_config)
    
    # Create a single Flask app
    app = Flask(__name__)
    CORS(app)  # Enable CORS for the app
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:159753@localhost:5432/SupplyChain_DW'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_USERNAME'] = 'chaymariahi961@gmail.com'
    app.config['MAIL_PASSWORD'] = 'vdal lyei uuen elqs'
    app.config['MAIL_DEFAULT_SENDER'] = ('SupplyChain_ChatBot', 'chaymariahi961@gmail.com')

    # === Init Extensions ===
    db.init_app(app)
    mail.init_app(app)

    # === Register Routes / APIs ===
    app.register_blueprint(chatbot_bp)  # Chatbot API
    # Initialize APIs with the shared Flask app
    user_api = UserAPI(app, db_config)
    sarima_api = SarimaAPI(app)
    recommendation_api = RecommendationAPI(app)
    random_forest_api = RandomForestAPI(app)
    svc_api = SVCApi(app)
    distribution_api = DistributionAPI(app)
    inventory_api = InventoryAPI(app)
    performance_api = PerformanceAPI(app)
    production_delay_api = ProductionDelayAPI(app)
    
    # Run the Flask app
    try:
        app.run(debug=True, host='0.0.0.0', port=5000)
    finally:
        db_config.close_connection()

if __name__ == '__main__':
    main()