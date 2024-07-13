from flask import Flask, request, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from models import User  # Import your User model here
from config import create_app, db
from flask_bcrypt import Bcrypt
from flask_cors import CORS

# Create app instance
app = create_app('development')
CORS(app)

# Initialize Flask-Bcrypt
bcrypt = Bcrypt(app)

# Initialize Flask-Login
login_manager = LoginManager(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

# User Management
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if len(data['password']) < 10:
        return jsonify({'message': 'Password must be at least 10 characters long'}), 400
    
    # Ensure role is either "Artist" or "Art Enthusiast"
    role = data.get('role', '').lower()  # Convert role to lowercase for case insensitivity
    
    if role not in ['artist', 'art enthusiast']:
        return jsonify({'message': 'Role must be either "Artist" or "Art Enthusiast"'}), 400
    
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], email=data['email'], password=hashed_password, role=role)
    
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'})

@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return jsonify({'message': 'Preflight request successful'}), 200

    data = request.get_json()
    
    # Check if 'email' and 'password' exist in data
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Invalid email or password'}), 401

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        return jsonify({'message': 'Login successful', 'user': user.to_dict(), 'role': user.role})
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'})

@app.route('/dashboard', methods=['GET'])
@login_required
def dashboard():
    return jsonify({'message': 'Welcome to your dashboard', 'user': current_user.to_dict()})

# Error Handlers
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'message': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'message': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(port=5555, debug=True)
