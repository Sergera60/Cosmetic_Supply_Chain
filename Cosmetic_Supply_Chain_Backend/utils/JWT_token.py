import pymongo
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv
import jwt
from typing import Dict, Optional

# Load environment variables
load_dotenv()

class JWTToken:
    SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'n3NghlKkuMOcUcxuDw8J1zIfLOlmp4oJfM5qPz8T/0259kuuvIOdXCSm4gvWoHR')
    ALGORITHM = 'HS256'

    @classmethod
    def generate_token(cls, user_id: str, role: str) -> str:
        """
        Generate JWT token for a user
        """
        payload = {
            'user_id': user_id,
            'role': role,
            'exp': datetime.utcnow() + timedelta(hours=24),  # Token expires in 24 hours
            'iat': datetime.utcnow()
        }
        return jwt.encode(payload, cls.SECRET_KEY, algorithm=cls.ALGORITHM)

    @classmethod
    def verify_token(cls, token: str) -> Optional[Dict]:
        """
        Verify and decode JWT token
        """
        try:
            payload = jwt.decode(token, cls.SECRET_KEY, algorithms=[cls.ALGORITHM])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None