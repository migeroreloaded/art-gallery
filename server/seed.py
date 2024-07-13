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

                # Create sample users
        users = []
        for _ in range(10):
            password = fake.password(length=10)
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                password=bcrypt.generate_password_hash(password).decode('utf-8'),
                role=rc(['artist', 'collector'])
            )
            users.append(user)
        db.session.add_all(users)
        db.session.commit()

                # Create sample artists
        artists = []
        for _ in range(5):
            artist = Artist(
                name=fake.name(),
                biography=fake.text(),
                birthdate=fake.date_of_birth(minimum_age=20, maximum_age=70),
                nationality=fake.country(),
                image=get_random_image_url(artist_image_urls)  # Fetch URL for artist image
            )
            artists.append(artist)
        db.session.add_all(artists)
        db.session.commit()

                # Define lists of relevant artwork data
        artwork_titles = [
            "Starry Night", "Mona Lisa", "The Scream", "The Persistence of Memory", 
            "Girl with a Pearl Earring", "The Night Watch", "The Birth of Venus", 
            "The Last Supper", "The Kiss", "Guernica"
        ]
        artwork_mediums = ["Oil on canvas", "Watercolor", "Acrylic", "Digital"]
        artwork_styles = ["Abstract", "Realism", "Impressionism", "Surrealism"]

                # Create sample artworks
        artworks = []
        for _ in range(20):
            artwork = Artwork(
                title=rc(artwork_titles),
                medium=rc(artwork_mediums),
                style=rc(artwork_styles),
                price=round(fake.pydecimal(left_digits=3, right_digits=2, positive=True), 2),
                available=rc([True, False]),
                artist_id=rc([artist.id for artist in artists]),
                image=get_random_image_url(artwork_image_urls)  # Fetch URL for artwork image
            )
            artworks.append(artwork)
        db.session.add_all(artworks)
        db.session.commit()

                # Create sample exhibitions
        exhibitions = []
        for _ in range(5):
            exhibition = Exhibition(
                name=fake.catch_phrase(),
                start_date=fake.date_this_year(),
                end_date=fake.date_this_year(),
                description=fake.text(),
                artist_id=rc([artist.id for artist in artists])  # Ensure artist_id is included
            )
            exhibitions.append(exhibition)
        db.session.add_all(exhibitions)
        db.session.commit()

                # Create sample artwork exhibitions with uniqueness check
        artwork_exhibitions = set()
        for _ in range(15):  # Adjust the number of relationships as needed
            while True:
                artwork_id = rc([artwork.id for artwork in artworks])
                exhibition_id = rc([exhibition.id for exhibition in exhibitions])
                if (artwork_id, exhibition_id) not in artwork_exhibitions:
                    artwork_exhibitions.add((artwork_id, exhibition_id))
                    break
        
        db.session.add_all([ArtworkExhibition(artwork_id=ae[0], exhibition_id=ae[1]) for ae in artwork_exhibitions])
        db.session.commit()

                # Create sample favorites with uniqueness check
        favorites = set()
        for _ in range(20):
            while True:
                user_id = rc([user.id for user in users])
                artwork_id = rc([artwork.id for artwork in artworks])
                if (user_id, artwork_id) not in favorites:
                    favorites.add((user_id, artwork_id))
                    break

        db.session.add_all([Favorite(user_id=fav[0], artwork_id=fav[1]) for fav in favorites])
        db.session.commit()

        print('Database seeded successfully.')








