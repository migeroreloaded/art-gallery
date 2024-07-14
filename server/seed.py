# seed.py
from datetime import datetime
from app import app, db
from models import User, Artist, Artwork, Exhibition, ArtworkExhibition, Favorite
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt(app)

def seed_data():
    with app.app_context():
        db.drop_all()
        db.create_all()



        print("Database seeded successfully!")

if __name__ == '__main__':
    seed_data()
