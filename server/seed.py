#!/usr/bin/env python3

# Standard library imports
from random import choice as rc

# Remote library imports
from faker import Faker
from flask_bcrypt import Bcrypt
import requests

# Local imports
from app import app
from models import db, User, Artist, Artwork, Exhibition, Favorite, ArtworkExhibition

UNSPLASH_ARTISTS_URL = "https://unsplash.com/s/photos/artist"
UNSPLASH_ARTWORKS_URL = "https://unsplash.com/s/photos/artwork"

def get_image_urls(url):
    response = requests.get(url)
    if response.status_code == 200:
        html = response.text
        image_urls = list(set(html.split('src="')[1:]))
        image_urls = [url.split('"')[0] for url in image_urls if url.startswith('https://images.unsplash.com')]
        return image_urls
    else:
        return []

def get_random_image_url(image_urls):
    return rc(image_urls) if image_urls else "https://via.placeholder.com/150"

if __name__ == '__main__':
    fake = Faker()
    bcrypt = Bcrypt(app)
    
    with app.app_context():
        print("Starting seed...")

        # Fetch image URLs from Unsplash
        artist_image_urls = get_image_urls(UNSPLASH_ARTISTS_URL)
        artwork_image_urls = get_image_urls(UNSPLASH_ARTWORKS_URL)

                # Drop all tables and create them
        db.drop_all()
        db.create_all()


