import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class DatabaseConfig:
    _instance = None

    def __new__(cls):
        if not cls._instance:
            cls._instance = super(DatabaseConfig, cls).__new__(cls)
            cls._instance._initialize()
        return cls._instance

    def _initialize(self):
        # Database configuration from environment variables with defaults
        self.HOST = os.getenv('MONGO_HOST', 'localhost')
        self.PORT = int(os.getenv('MONGO_PORT', '27017'))
        self.DATABASE = os.getenv('MONGO_DATABASE', 'Cosmetic_Supply_Chain')  # Made configurable
        
        # Connection string
        self.CONNECTION_STRING = f"mongodb://{self.HOST}:{self.PORT}"
        
        # Establish connection
        try:
            self.client = MongoClient(
                self.CONNECTION_STRING,
                serverSelectionTimeoutMS=5000  # Timeout after 5 seconds
            )
            # Test connection
            self.client.server_info()
            self.db = self.client[self.DATABASE]
            print("Database connection established successfully.")
        except Exception as e:
            print(f"Database connection error: {e}")
            raise

    def get_database(self):
        """Return the database instance"""
        if not self._is_connected():
            self._reconnect()
        return self.db

    def get_collection(self, collection_name):
        """Return a specific collection"""
        if not self._is_connected():
            self._reconnect()
        return self.db[collection_name]

    def close_connection(self):
        """Close the database connection"""
        if hasattr(self, 'client') and self.client:
            self.client.close()
            print("Database connection closed.")

    def _is_connected(self):
        """Check if the connection is still alive"""
        try:
            self.client.admin.command('ping')
            return True
        except Exception:
            return False

    def _reconnect(self):
        """Attempt to reconnect if connection is lost"""
        try:
            self.client = MongoClient(self.CONNECTION_STRING)
            self.db = self.client[self.DATABASE]
            print("Database reconnected successfully.")
        except Exception as e:
            print(f"Failed to reconnect to database: {e}")
            raise