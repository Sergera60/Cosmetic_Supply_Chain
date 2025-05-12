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