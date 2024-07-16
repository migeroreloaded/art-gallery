# app.py

from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from datetime import datetime, timedelta
from config import DevelopmentConfig, ProductionConfig
from models import User, Artist, Artwork, Exhibition, ArtworkExhibition, Favorite, init_app, db
from flask_sqlalchemy import SQLAlchemy



app = Flask(__name__)
CORS(app)

# Configuration setup (development or production)
app.config.from_object(DevelopmentConfig)
init_app(app)

bcrypt = Bcrypt()
jwt = JWTManager(app)

# Define routes and their functionalities

# User Management
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    role = data.get('role', '').lower()

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    user = User(email=data['email'], password=hashed_password, role=role)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        # Create JWT token
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': user.to_dict(),
            'role': user.role
        }), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # JWT token is required to logout
    return jsonify({'message': 'Logout successful'})

@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({'message': 'Welcome to your dashboard', 'user': user.to_dict()})

# Artwork Management
@app.route('/artworks', methods=['POST'])
@jwt_required()
def create_artwork():
    data = request.get_json()
    artwork = Artwork(
        title=data['title'],
        medium=data['medium'],
        style=data['style'],
        price=data['price'],
        available=data['available'],
        artist_id=get_jwt_identity()  # Get artist_id from JWT token
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
@jwt_required()
def update_artwork(id):
    artwork = Artwork.query.get_or_404(id)
    data = request.get_json()
    artwork.title = data['title']
    artwork.medium = data['medium']
    artwork.style = data['style']
    artwork.price = data['price']
    artwork.available = data['available']
    db.session.commit()
    return jsonify({'message': 'Artwork updated successfully'})

@app.route('/artworks/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_artwork(id):
    artwork = Artwork.query.get_or_404(id)
    db.session.delete(artwork)
    db.session.commit()
    return jsonify({'message': 'Artwork deleted successfully'})

# Exhibition Management
@app.route('/exhibitions', methods=['POST'])
@jwt_required()
def create_exhibition():
    data = request.get_json()
    try:
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
        end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'message': 'Invalid date format. Use YYYY-MM-DD.'}), 400

    exhibition = Exhibition(
        name=data['name'],
        start_date=start_date,
        end_date=end_date,
        description=data['description'],
        artist_id=get_jwt_identity()  # Get artist_id from JWT token
    )
    db.session.add(exhibition)
    db.session.commit()
    return jsonify({'message': 'Exhibition created successfully'})

@app.route('/exhibitions', methods=['GET'])
def get_exhibitions():
    exhibitions = Exhibition.query.all()
    return jsonify([exhibition.to_dict() for exhibition in exhibitions])

@app.route('/exhibitions/<int:id>', methods=['GET'])
def get_exhibition(id):
    exhibition = Exhibition.query.get_or_404(id)
    return jsonify(exhibition.to_dict())

@app.route('/exhibitions/<int:id>', methods=['PUT'])
@jwt_required()
def update_exhibition(id):
    exhibition = Exhibition.query.get_or_404(id)
    data = request.get_json()
    try:
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
        end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'message': 'Invalid date format. Use YYYY-MM-DD.'}), 400

    exhibition.name = data['name']
    exhibition.start_date = start_date
    exhibition.end_date = end_date
    exhibition.description = data['description']
    db.session.commit()
    return jsonify({'message': 'Exhibition updated successfully'})

@app.route('/exhibitions/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_exhibition(id):
    exhibition = Exhibition.query.get_or_404(id)
    db.session.delete(exhibition)
    db.session.commit()
    return jsonify({'message': 'Exhibition deleted successfully'})

# Artwork-Exhibition Management
@app.route('/exhibitions/<int:exhibition_id>/artworks/<int:artwork_id>', methods=['POST'])
@jwt_required()
def add_artwork_to_exhibition(exhibition_id, artwork_id):
    artwork_exhibition = ArtworkExhibition(exhibition_id=exhibition_id, artwork_id=artwork_id)
    db.session.add(artwork_exhibition)
    db.session.commit()
    return jsonify({'message': 'Artwork added to exhibition successfully'})

@app.route('/exhibitions/<int:exhibition_id>/artworks/<int:artwork_id>', methods=['DELETE'])
@jwt_required()
def remove_artwork_from_exhibition(exhibition_id, artwork_id):
    artwork_exhibition = ArtworkExhibition.query.filter_by(exhibition_id=exhibition_id, artwork_id=artwork_id).first()
    db.session.delete(artwork_exhibition)
    db.session.commit()
    return jsonify({'message': 'Artwork removed from exhibition successfully'})

# Artist Management
@app.route('/artists', methods=['GET'])
def get_artists():
    artists = Artist.query.all()
    return jsonify([artist.to_dict() for artist in artists])

@app.route('/artists/<int:id>', methods=['GET'])
def get_artist(id):
    artist = Artist.query.get_or_404(id)
    return jsonify(artist.to_dict())

@app.route('/artists/<int:id>', methods=['PUT'])
@jwt_required()
def update_artist(id):
    artist = Artist.query.get_or_404(id)
    data = request.get_json()
    try:
        if 'birthdate' in data:
            artist.birthdate = datetime.strptime(data['birthdate'], '%Y-%m-%d').date()
        artist.biography = data.get('biography', artist.biography)
        artist.nationality = data.get('nationality', artist.nationality)
        artist.image = data.get('image', artist.image)
        db.session.commit()
        return jsonify({'message': 'Artist updated successfully'})
    except ValueError:
        return jsonify({'message': 'Invalid birthdate format. Use YYYY-MM-DD.'}), 400

@app.route('/artists/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_artist(id):
    artist = Artist.query.get_or_404(id)
    # Delete associated user
    user = User.query.get(artist.user_id)
    db.session.delete(artist)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Artist and associated user deleted successfully'})

if __name__ == '__main__':
    app.run(port=5555, debug=True)
