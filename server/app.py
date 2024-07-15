from flask import Flask, request, jsonify, redirect, url_for
from flask_login import LoginManager, login_user, logout_user, current_user
from models import User, Artist, Artwork, Exhibition, ArtworkExhibition, Favorite
from config import create_app, db
from datetime import datetime
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

    role = data.get('role', '').lower()

    if role not in ['artist', 'art enthusiast']:
        return jsonify({'message': 'Role must be either "artist" or "art enthusiast"'}), 400

    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    user = User(email=data['email'], password=hashed_password, role=role)
    db.session.add(user)
    db.session.commit()

    if role == 'artist':
        try:
            birthdate = datetime.strptime(data['birthdate'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'message': 'Invalid birthdate format. Use YYYY-MM-DD.'}), 400

        artist = Artist(
            name=data['name'],
            biography=data['biography'],
            birthdate=birthdate,
            nationality=data['nationality'],
            image=data.get('image', ''), 
            user_id=user.id
        )
        db.session.add(artist)
        db.session.commit()

    return jsonify({'message': 'User created successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        login_user(user)
        return jsonify({'message': 'Login successful', 'user': user.to_dict(), 'role': user.role})
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'})

@app.route('/dashboard', methods=['GET'])
def dashboard():
    if current_user.is_authenticated:
        return jsonify({'message': 'Welcome to your dashboard', 'user': current_user.to_dict()})
    else:
        return jsonify({'message': 'Unauthorized'}), 401

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict())

@app.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    user.email = data['email']
    if 'password' in data:
        user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})

@app.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})

# Artwork Management
@app.route('/artworks', methods=['POST'])
def create_artwork():
    if current_user.is_authenticated and current_user.role == 'artist':
        data = request.get_json()
        artwork = Artwork(
            title=data['title'],
            medium=data['medium'],
            style=data['style'],
            price=data['price'],
            available=data['available'],
            artist_id=current_user.artist.id
        )
        db.session.add(artwork)
        db.session.commit()
        return jsonify({'message': 'Artwork created successfully'})
    else:
        return jsonify({'message': 'Unauthorized'}), 403

@app.route('/artworks', methods=['GET'])
def get_artworks():
    artworks = Artwork.query.all()
    return jsonify([artwork.to_dict() for artwork in artworks])

@app.route('/artworks/<int:id>', methods=['GET'])
def get_artwork(id):
    artwork = Artwork.query.get_or_404(id)
    return jsonify(artwork.to_dict())

@app.route('/artworks/<int:id>', methods=['PUT'])
def update_artwork(id):
    if current_user.is_authenticated and current_user.role == 'artist':
        artwork = Artwork.query.get_or_404(id)
        if artwork.artist.user_id != current_user.id:
            return jsonify({'message': 'Unauthorized'}), 403
        data = request.get_json()
        artwork.title = data['title']
        artwork.medium = data['medium']
        artwork.style = data['style']
        artwork.price = data['price']
        artwork.available = data['available']
        db.session.commit()
        return jsonify({'message': 'Artwork updated successfully'})
    else:
        return jsonify({'message': 'Unauthorized'}), 403

@app.route('/artworks/<int:id>', methods=['DELETE'])
def delete_artwork(id):
    if current_user.is_authenticated and current_user.role == 'artist':
        artwork = Artwork.query.get_or_404(id)
        if artwork.artist.user_id != current_user.id:
            return jsonify({'message': 'Unauthorized'}), 403
        db.session.delete(artwork)
        db.session.commit()
        return jsonify({'message': 'Artwork deleted successfully'})
    else:
        return jsonify({'message': 'Unauthorized'}), 403

# Exhibition Management
@app.route('/exhibitions', methods=['POST'])
def create_exhibition():
    if current_user.is_authenticated and current_user.role == 'artist':
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
            artist_id=current_user.artist.id
        )
        db.session.add(exhibition)
        db.session.commit()
        return jsonify({'message': 'Exhibition created successfully'})
    else:
        return jsonify({'message': 'Unauthorized'}), 403

@app.route('/exhibitions', methods=['GET'])
def get_exhibitions():
    exhibitions = Exhibition.query.all()
    return jsonify([exhibition.to_dict() for exhibition in exhibitions])

@app.route('/exhibitions/<int:id>', methods=['GET'])
def get_exhibition(id):
    exhibition = Exhibition.query.get_or_404(id)
    return jsonify(exhibition.to_dict())

@app.route('/exhibitions/<int:id>', methods=['PUT'])
def update_exhibition(id):
    if current_user.is_authenticated and current_user.role == 'artist':
        exhibition = Exhibition.query.get_or_404(id)
        if exhibition.artist.user_id != current_user.id:
            return jsonify({'message': 'Unauthorized'}), 403
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
    else:
        return jsonify({'message': 'Unauthorized'}), 403

@app.route('/exhibitions/<int:id>', methods=['DELETE'])
def delete_exhibition(id):
    if current_user.is_authenticated and current_user.role == 'artist' and exhibition.artist_id == current_user.artist.id:
        exhibition = Exhibition.query.get_or_404(id)
        if exhibition.artist.user_id != current_user.id:
            return jsonify({'message': 'Unauthorized'}), 403
        db.session.delete(exhibition)
        db.session.commit()
        return jsonify({'message': 'Exhibition deleted successfully'})
    else:
        return jsonify({'message': 'Unauthorized'}), 403

# Artwork-Exhibition Management
@app.route('/exhibitions/<int:exhibition_id>/artworks/<int:artwork_id>', methods=['POST'])
def add_artwork_to_exhibition(exhibition_id, artwork_id):
    if current_user.is_authenticated and current_user.role == 'artist':
        exhibition = Exhibition.query.get_or_404(exhibition_id)
        artwork = Artwork.query.get_or_404(artwork_id)
        if exhibition.artist.user_id != current_user.id:
            return jsonify({'message': 'Unauthorized'}), 403
        if artwork.artist.user_id != current_user.id:
            return jsonify({'message': 'Unauthorized'}), 403

        artwork_exhibition = ArtworkExhibition(exhibition_id=exhibition_id, artwork_id=artwork_id)
        db.session.add(artwork_exhibition)
        db.session.commit()
        return jsonify({'message': 'Artwork added to exhibition successfully'})
    else:
        return jsonify({'message': 'Unauthorized'}), 403

@app.route('/exhibitions/<int:exhibition_id>/artworks/<int:artwork_id>', methods=['DELETE'])
def remove_artwork_from_exhibition(exhibition_id, artwork_id):
    if current_user.is_authenticated and current_user.role == 'artist':
        exhibition = Exhibition.query.get_or_404(exhibition_id)
        artwork = Artwork.query.get_or_404(artwork_id)
        if exhibition.artist.user_id != current_user.id:
            return jsonify({'message': 'Unauthorized'}), 403
        if artwork.artist.user_id != current_user.id:
            return jsonify({'message': 'Unauthorized'}), 403

        artwork_exhibition = ArtworkExhibition.query.filter_by(exhibition_id=exhibition_id, artwork_id=artwork_id).first()
        db.session.delete(artwork_exhibition)
        db.session.commit()
        return jsonify({'message': 'Artwork removed from exhibition successfully'})
    else:
        return jsonify({'message': 'Unauthorized'}), 403

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
def update_artist(id):
    if current_user.is_authenticated and current_user.role == 'artist':
        artist = Artist.query.get_or_404(id)
        if artist.user_id != current_user.id:
            return jsonify({'message': 'Unauthorized'}), 403
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
    else:
        return jsonify({'message': 'Unauthorized'}), 403

@app.route('/artists/<int:id>', methods=['DELETE'])
def delete_artist(id):
    if current_user.is_authenticated and current_user.role == 'artist':
        artist = Artist.query.get_or_404(id)
        if artist.user_id != current_user.id:
            return jsonify({'message': 'Unauthorized'}), 403
        # Delete associated user
        user = User.query.get(artist.user_id)
        db.session.delete(artist)
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'Artist and associated user deleted successfully'})
    else:
        return jsonify({'message': 'Unauthorized'}), 403

if __name__ == '__main__':
    app.run(port=5555, debug=True)
