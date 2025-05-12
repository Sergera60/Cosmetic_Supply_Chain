from bson import ObjectId
from typing import Optional, List, Dict
from models.User import User
from config.DatabaseConfig import DatabaseConfig
from utils.Password_Hasher import hash_password, verify_password
from datetime import datetime

class UserDAO:
    def __init__(self, db_config: DatabaseConfig):
        self.db = db_config
        self.users_collection = self.db.get_collection('users')

    def create_user(self, user: User) -> str:
        user.password = hash_password(user.password)
        valid_roles = ['distribution', 'inventory', 'procurment', 'production', 'admin']
        if user.role not in valid_roles:
            raise ValueError(f"Invalid role: {user.role}. Must be one of {valid_roles}")
        user_dict = {k: v for k, v in user.__dict__.items() if not callable(v)}
        result = self.users_collection.insert_one(user_dict)
        return str(result.inserted_id)

    def get_user_by_email(self, email: str) -> Optional[User]:
        user_data = self.users_collection.find_one({'email': email})
        return User.from_dict(user_data) if user_data else None

    def get_user_by_id(self, user_id: str) -> Optional[User]:
        try:
            user_data = self.users_collection.find_one({'_id': ObjectId(user_id)})
            return User.from_dict(user_data) if user_data else None
        except:
            return None

    def update_last_login(self, user_id: str):
        self.users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': {'last_login': datetime.utcnow()}}
        )

    def authenticate_user(self, email: str, password: str) -> Optional[User]:
        user = self.get_user_by_email(email)
        if user and verify_password(password, user.password):
            return user
        return None

    def update_user_role(self, user_id: str, new_role: str) -> bool:
        """Update a user's role by ID"""
        
        valid_roles = ['distribution', 'inventory', 'procurment', 'production', 'admin']
        if new_role not in valid_roles:
            raise ValueError(f"Invalid role: {new_role}. Must be one of {valid_roles}")
        result = self.users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': {'role': new_role}}
        )
        return result.modified_count > 0

    def update_user_password(self, user_id: str, new_password: str) -> bool:
        """Update a user's password by ID"""
        hashed_password = hash_password(new_password)
        result = self.users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': {'password': hashed_password}}
        )
        return result.modified_count > 0

    def get_all_users(self) -> List[Dict]:
        """Fetch all users"""
        users = self.users_collection.find()
        return [User.from_dict(user).to_dict() for user in users]