from flask import Flask, request, jsonify
from flask_restful import Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from models import User, Artist, Artwork, Exhibition, ArtworkExhibition, Favorite
from config import app, db, api, Config

# Initialize Flask-Migrate
migrate = Migrate(app, db)

# Initialize Flask-Bcrypt and Flask-Login
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
    # Validate password length
    if len(data['password']) < 10:
        return jsonify({'message': 'Password must be at least 10 characters long'}), 400
    
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], email=data['email'], password=hashed_password, role='artist')
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({'message': 'User created successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        login_user(user)
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'})

# Artwork Management
@app.route('/artworks', methods=['POST'])
@login_required
def create_artwork():
    data = request.get_json()
    artwork = Artwork(
        title=data['title'],
        medium=data['medium'],
        style=data['style'],
        price=data['price'],
        available=data['available'],
        artist_id=current_user.id
    )
    db.session.add(artwork)
    db.session.commit()
    return jsonify({'message': 'Artwork created successfully'})

@app.route('/artworks', methods=['GET'])
def get_artworks():
    artworks = Artwork.query.all()
    return jsonify([artwork.to_dict() for artwork in artworks])

@app.route('/artworks/<int:id>', methods=['GET'])
def get_artwork(id):
    artwork = Artwork.query.get_or_404(id)
    return jsonify(artwork.to_dict())

@app.route('/artworks/<int:id>', methods=['PUT'])
@login_required
def update_artwork(id):
    artwork = Artwork.query.get_or_404(id)
    if artwork.artist_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403
    data = request.get_json()
    artwork.title = data['title']
    artwork.medium = data['medium']
    artwork.style = data['style']
    artwork.price = data['price']
    artwork.available = data['available']
    db.session.commit()
    return jsonify({'message': 'Artwork updated successfully'})

@app.route('/artworks/<int:id>', methods=['DELETE'])
@login_required
def delete_artwork(id):
    artwork = Artwork.query.get_or_404(id)
    if artwork.artist_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403
    db.session.delete(artwork)
    db.session.commit()
    return jsonify({'message': 'Artwork deleted successfully'})

# Event Management
@app.route('/events', methods=['POST'])
@login_required
def create_event():
    data = request.get_json()
    event = Exhibition(
        name=data['name'],
        start_date=data['start_date'],
        end_date=data['end_date'],
        description=data['description'],
        artist_id=current_user.id
    )
    db.session.add(event)
    db.session.commit()
    return jsonify({'message': 'Event created successfully'})

@app.route('/events', methods=['GET'])
def get_events():
    events = Exhibition.query.all()
    return jsonify([event.to_dict() for event in events])

@app.route('/events/<int:id>', methods=['GET'])
def get_event(id):
    event = Exhibition.query.get_or_404(id)
    return jsonify(event.to_dict())

@app.route('/events/<int:id>', methods=['PUT'])
@login_required
def update_event(id):
    event = Exhibition.query.get_or_404(id)
    if event.artist_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403
    data = request.get_json()
    event.name = data['name']
    event.start_date = data['start_date']
    event.end_date = data['end_date']
    event.description = data['description']
    db.session.commit()
    return jsonify({'message': 'Event updated successfully'})

@app.route('/events/<int:id>', methods=['DELETE'])
@login_required
def delete_event(id):
    event = Exhibition.query.get_or_404(id)
    if event.artist_id != current_user.id:
        return jsonify({'message': 'Unauthorized'}), 403
    db.session.delete(event)
    db.session.commit()
    return jsonify({'message': 'Event deleted successfully'})

if __name__ == '__main__':
    app.run(port=5555, debug=True)
