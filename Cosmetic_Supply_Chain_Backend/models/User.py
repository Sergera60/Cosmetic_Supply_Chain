from dataclasses import dataclass, field
from bson import ObjectId
from typing import Optional
from datetime import datetime

@dataclass
class User:
    email: str
    password: str
    _id: ObjectId = field(default_factory=ObjectId)
    role: str = 'user'  # Default role, overridden by API request
    last_login: Optional[datetime] = None

    def to_dict(self):
        return {
            '_id': str(self._id),
            'email': self.email,
            'role': self.role,
            'last_login': self.last_login.isoformat() if self.last_login else None
        }

    @classmethod
    def from_dict(cls, data: dict):
        if isinstance(data.get('_id'), str):
            data['_id'] = ObjectId(data['_id'])
        return cls(**{k: v for k, v in data.items() if k in cls.__annotations__})