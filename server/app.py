from flask import Flask, request, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from models import User, Artist, Artwork, Exhibition, ArtworkExhibition, Favorite
from config import create_app, db
from flask_bcrypt import Bcrypt

# Create app instance
app = create_app('development')

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
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    
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

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@app.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict())

@app.route('/users/<int:id>', methods=['PUT'])
@login_required
def update_user(id):
    user = User.query.get_or_404(id)
    data = request.get_json()
    user.username = data['username']
    user.email = data['email']
    if 'password' in data:
        user.password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})

@app.route('/users/<int:id>', methods=['DELETE'])
@login_required
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted successfully'})

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

# Artist Management
@app.route('/artists', methods=['POST'])
@login_required
def create_artist():
    data = request.get_json()
    artist = Artist(
        name=data['name'],
        biography=data['biography'],
        birthdate=data['birthdate'],
        nationality=data['nationality']
    )
    db.session.add(artist)
    db.session.commit()
    return jsonify({'message': 'Artist created successfully'})

@app.route('/artists', methods=['GET'])
def get_artists():
    artists = Artist.query.all()
    return jsonify([artist.to_dict() for artist in artists])

@app.route('/artists/<int:id>', methods=['GET'])
def get_artist(id):
    artist = Artist.query.get_or_404(id)
    return jsonify(artist.to_dict())

@app.route('/artists/<int:id>', methods=['PUT'])
@login_required
def update_artist(id):
    artist = Artist.query.get_or_404(id)
    data = request.get_json()
    artist.name = data['name']
    artist.biography = data['biography']
    artist.birthdate = data['birthdate']
    artist.nationality = data['nationality']
    db.session.commit()
    return jsonify({'message': 'Artist updated successfully'})

@app.route('/artists/<int:id>', methods=['DELETE'])
@login_required
def delete_artist(id):
    artist = Artist.query.get_or_404(id)
    db.session.delete(artist)
    db.session.commit()
    return jsonify({'message': 'Artist deleted successfully'})

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
