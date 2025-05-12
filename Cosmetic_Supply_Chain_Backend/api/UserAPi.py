from flask import Flask, request, jsonify
from flask_cors import CORS
from config.DatabaseConfig import DatabaseConfig
from dao.UserDAO import UserDAO
from models.User import User
from utils.JWT_token import JWTToken
from flask_cors import CORS

class UserAPI:
    def __init__(self, app, db_config: DatabaseConfig):
        self.app = app
        CORS(self.app)  # Enable CORS on the shared app
        self.db_config = db_config
        self.user_dao = UserDAO(db_config)
        self.register_routes()

    def register_routes(self):
        """Register all API routes"""
        self.app.route('/users/add', methods=['POST'])(self.add_user)
        self.app.route('/users/login', methods=['POST'])(self.login_user)
        self.app.route('/users/profile', methods=['GET'])(self.get_user_profile)
        self.app.route('/users/update-role', methods=['PUT'])(self.update_role)  # New
        self.app.route('/users/update-password', methods=['PUT'])(self.update_password)  # New
        self.app.route('/users/get-users', methods=['GET'])(self.get_all_users)  # New
        self.app.route('/users/verify-token', methods=['GET'])(self.verify_token)
        self.app.route('/users/<user_id>', methods=['GET'])(self.get_user_by_id)

    def add_user(self):
        """Add a new user from dashboard (admin only)"""
        try:
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'error': 'Missing authorization token'}), 401
            
            payload = JWTToken.verify_token(token)
            if not payload:
                return jsonify({'error': 'Invalid or expired token'}), 401
            if payload.get('role') != 'admin':
                return jsonify({'error': 'Unauthorized: Admin access required'}), 403

            data = request.json
            if not data or not all(k in data for k in ('email', 'password', 'role')):
                return jsonify({'error': 'Missing required fields (email, password, role)'}), 400
            
            if self.user_dao.get_user_by_email(data['email']):
                return jsonify({'error': 'User with this email already exists'}), 409
            
            user = User(
                email=data['email'],
                password=data['password'],
                role=data['role']
            )
            user_id = self.user_dao.create_user(user)
            
            return jsonify({
                'message': 'User added successfully',
                'user_id': user_id,
                'role': user.role
            }), 201
        
        except ValueError as e:
            return jsonify({'error': str(e)}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    def login_user(self):
        """User login endpoint"""
        try:
            data = request.json
            if not data or not all(k in data for k in ('email', 'password')):
                return jsonify({'error': 'Missing email or password'}), 400
            
            user = self.user_dao.authenticate_user(data['email'], data['password'])
            if user:
                self.user_dao.update_last_login(str(user._id))
                token = JWTToken.generate_token(str(user._id), user.role)
                return jsonify({
                    'message': 'Login successful',
                    'token': token,
                    'user': user.to_dict()
                }), 200
            return jsonify({'error': 'Invalid credentials'}), 401
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    def get_user_profile(self):
        """Get user profile endpoint with token authentication"""
        try:
            auth_header = request.headers.get('Authorization')
            if not auth_header:
                return jsonify({'error': 'Missing authorization token'}), 401
            
            token = auth_header
            payload = JWTToken.verify_token(token)
            if not payload:
                return jsonify({'error': 'Invalid or expired token'}), 401
            
            user = self.user_dao.get_user_by_id(payload['user_id'])
            if user:
                return jsonify(user.to_dict()), 200
            return jsonify({'error': 'User not found'}), 404
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    def update_role(self):
        """Update a user's role (admin only)"""
        try:
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'error': 'Missing authorization token'}), 401
            
            payload = JWTToken.verify_token(token)
            if not payload:
                return jsonify({'error': 'Invalid or expired token'}), 401
            if payload.get('role') != 'admin':
                return jsonify({'error': 'Unauthorized: Admin access required'}), 403

            data = request.json
            if not data or not all(k in data for k in ('user_id', 'role')):
                return jsonify({'error': 'Missing required fields (user_id, role)'}), 400
            
            user_id = data['user_id']
            new_role = data['role']
            
            if self.user_dao.update_user_role(user_id, new_role):
                return jsonify({'message': 'Role updated successfully'}), 200
            return jsonify({'error': 'User not found or role unchanged'}), 404
        
        except ValueError as e:
            return jsonify({'error': str(e)}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    def update_password(self):
        """Update the authenticated user's password"""
        try:
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'error': 'Missing authorization token'}), 401
            
            payload = JWTToken.verify_token(token)
            if not payload:
                return jsonify({'error': 'Invalid or expired token'}), 401
            
            data = request.json
            if not data or 'new_password' not in data:
                return jsonify({'error': 'Missing new_password field'}), 400
            
            user_id = payload['user_id']
            new_password = data['new_password']
            
            if self.user_dao.update_user_password(user_id, new_password):
                return jsonify({'message': 'Password updated successfully'}), 200
            return jsonify({'error': 'User not found or password unchanged'}), 404
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    def get_all_users(self):
        """Get all users (admin only)"""
        try:
            token = request.headers.get('Authorization')
            if not token:
                return jsonify({'error': 'Missing authorization token'}), 401
            
            payload = JWTToken.verify_token(token)
            if not payload:
                return jsonify({'error': 'Invalid or expired token'}), 401
            if payload.get('role') != 'admin':
                return jsonify({'error': 'Unauthorized: Admin access required'}), 403
            
            users = self.user_dao.get_all_users()
            return jsonify({'users': users}), 200
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    def verify_token(self):
        """Verify if the JWT token is still valid"""
        try:
            auth_header = request.headers.get('Authorization')
            if not auth_header:
                return jsonify({'valid': False, 'error': 'Missing authorization token'}), 401
            
            token = auth_header
            payload = JWTToken.verify_token(token)
            
            if payload:
                # Optionally check if user still exists
                user = self.user_dao.get_user_by_id(payload['user_id'])
                if user:
                    return jsonify({'valid': True, 'role': user.role}), 200
                return jsonify({'valid': False, 'error': 'User not found'}), 404
            
            return jsonify({'valid': False, 'error': 'Invalid or expired token'}), 401
        
        except Exception as e:
            return jsonify({'valid': False, 'error': str(e)}), 500

    def get_user_by_id(self, user_id):
        """Get user details by ID"""
        try:
            auth_header = request.headers.get('Authorization')
            if not auth_header:
                return jsonify({'error': 'Missing authorization token'}), 401
            
            token = auth_header  # Raw token, no Bearer
            payload = JWTToken.verify_token(token)
            if not payload:
                return jsonify({'error': 'Invalid or expired token'}), 401
            
            # Optionally restrict to admins or self
            if payload['user_id'] != user_id and payload.get('role') != 'admin':
                return jsonify({'error': 'Unauthorized: Can only access own profile or requires admin role'}), 403

            user = self.user_dao.get_user_by_id(user_id)
            if user:
                return jsonify(user.to_dict()), 200
            
            return jsonify({'error': 'User not found'}), 404
        
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    def run(self, debug=True, host='0.0.0.0', port=5000):
        """Run the Flask application"""
        self.app.run(debug=debug, host=host, port=port)