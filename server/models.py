# models.py

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

class Artist(db.Model, SerializerMixin):
    __tablename__ = 'artists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    biography = db.Column(db.Text, nullable=True)
    birthdate = db.Column(db.Date, nullable=False)
    nationality = db.Column(db.String(50), nullable=False)

    artworks = db.relationship('Artwork', backref='artist', lazy=True)

class Artwork(db.Model, SerializerMixin):
    __tablename__ = 'artworks'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    medium = db.Column(db.String(50), nullable=False)
    style = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    available = db.Column(db.Boolean, default=True, nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artists.id'), nullable=False)

    exhibitions = db.relationship('ArtworkExhibition', backref='artwork', lazy=True)
    favorites = db.relationship('Favorite', backref='artwork', lazy=True)

class Exhibition(db.Model, SerializerMixin):
    __tablename__ = 'exhibitions'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    description = db.Column(db.Text, nullable=True)

    artworks = db.relationship('ArtworkExhibition', backref='exhibition', lazy=True)

class ArtworkExhibition(db.Model, SerializerMixin):
    __tablename__ = 'artwork_exhibitions'
    artwork_id = db.Column(db.Integer, db.ForeignKey('artworks.id'), primary_key=True)
    exhibition_id = db.Column(db.Integer, db.ForeignKey('exhibitions.id'), primary_key=True)

class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    artwork_id = db.Column(db.Integer, db.ForeignKey('artworks.id'), primary_key=True)
