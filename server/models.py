from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import db  # Ensure this line correctly imports db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(50), nullable=False)

    favorites = db.relationship('Favorite', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'role': self.role,
        }

class Artist(db.Model, SerializerMixin):
    __tablename__ = 'artists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    biography = db.Column(db.Text, nullable=True)
    birthdate = db.Column(db.Date, nullable=False)
    nationality = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(255))  # Adjust the length as per your needs

    artworks = db.relationship('Artwork', backref='artist', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'biography': self.biography,
            'birthdate': self.birthdate.isoformat(),
            'nationality': self.nationality,
            'image': self.image  # Include image serialization
        }

class Artwork(db.Model, SerializerMixin):
    __tablename__ = 'artworks'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    medium = db.Column(db.String(50), nullable=False)
    style = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    available = db.Column(db.Boolean, default=True, nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)
    image = db.Column(db.String(255))  # Adjust the length as per your needs

    exhibitions = db.relationship('ArtworkExhibition', backref='artwork', lazy=True)
    favorites = db.relationship('Favorite', backref='artwork', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'medium': self.medium,
            'style': self.style,
            'price': float(self.price),
            'available': self.available,
            'artist_id': self.artist_id,
            'image': self.image  # Include image serialization if needed
        }

class Exhibition(db.Model, SerializerMixin):
    __tablename__ = 'exhibitions'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    description = db.Column(db.Text, nullable=True)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)

    artworks = db.relationship('ArtworkExhibition', backref='exhibition', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat(),
            'description': self.description,
            'artist_id': self.artist_id,
        }

class ArtworkExhibition(db.Model, SerializerMixin):
    __tablename__ = 'artwork_exhibitions'
    artwork_id = db.Column(db.Integer, db.ForeignKey('artworks.id'), primary_key=True)
    exhibition_id = db.Column(db.Integer, db.ForeignKey('exhibitions.id'), primary_key=True)

    def to_dict(self):
        return {
            'artwork_id': self.artwork_id,
            'exhibition_id': self.exhibition_id,
        }

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    artwork_id = db.Column(db.Integer, db.ForeignKey('artworks.id'), primary_key=True)

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'artwork_id': self.artwork_id,
        }
