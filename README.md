# Art Gallery Project
## Contributors
Brimin KIpkorir
Elvis Moses
Paul Saitabau
Brenda Cheptoo
Michael George

# The Problem
Artists often struggle with an effective way to present their portfolios online, limiting their exposure and reach to potential buyers and art enthusiasts. 
Additionally, artists face significant challenges in managing and promoting their events. Existing tools are either too fragmented or not tailored to the unique needs of artists, making it difficult to organize exhibitions and engage with their audience efficiently.


# Solution
This project provides a comprehensive, user-friendly platform that enhances visibility for artists' work and streamlines event management.
It provides a solution by combining a Flask backend with a React frontend and ensures a seamless and interactive experience for both users and artists, with a focus on accessibility and responsiveness. The backend handles database operations using SQLAlchemy with an SQLite database, while the frontend provides a dynamic and intuitive interface.

# Table of Contents
1.The Problem
2.Solution
3.Installation
4.API Documentation
-Key React COmponents
  Artist.js
  Artwork.js
  UseAuth.js
  ExhibitionPage.js
  LoginPage.js
-Routes
  User Routes
  Artist Routes
  Artwork Routes
  Exhibition Routes
-Database Models
  User
  Artist
  Artwork
  Exhibition
  Favorite
5.Inpiration
6.License

# Installation
## Backend Installation

### Clone the repository
git clone git@github.com:migeroreloaded/art-gallery.git

### Create a Virtual environment 
pipenv install
pipenv shell

### Install the required packages
pip install Flask Flask-SQLAlchemy Flask-Login SQLAlchemy-Serializer Flask-Migrate

### Set up the database
flask db init
flask db migrate -m "Initial migration."
flask db upgrade

### Run the development server
flask run

## Frontend INstallation
### Navigate to frontend directory
cd client

### Install the required packages
npm install

### Run the development server
npm start

# Key React Components 
## Artist.js
Manages artist information such as name, biography, birthdate, and nationality.CRUD operations for managing artists in the art gallery.

## Artwork.js
Handles artwork details including title, medium, style, price, and availability. Provides functionality for CRUD operations related to artworks.

## UseAuth.js
Contains reusable components and utilities related to user authentication and authorization throughout the application.

## ExhibitionPage.js
Deals with exhibition details such as name, dates, and description. Provides functionality for CRUD operations related to exhibitions held in the art gallery.

## LoginPage.js
Responsible for user authentication and login functionality. It interacts with the backend to authenticate users and manage login sessions.

## Backend
### User routes

GET /users: Retrieve a list of users.
POST /users: Create a new user.
PUT /users: Update an existing user.
DELETE /users: Delete a user.

### Artist Routes:

GET /artists: Retrieve a list of artists.
POST /artists: Create a new artist.
PUT /artists: Update an existing artist.
DELETE /artists: Delete an artist.

### Artwork Routes:

GET /artworks: Retrieve a list of artworks.
POST /artworks: Create a new artwork.
PUT /artworks: Update an existing artwork.
DELETE /artworks: Delete an artwork.

### Exhibition Routes:

GET /exhibitions: Retrieve a list of exhibitions.
POST /exhibitions: Create a new exhibition.
PUT /exhibitions: Update an existing exhibition.
DELETE /exhibitions: Delete an exhibition.

# Database Models
## User

id (int, primary key)
username (string)
email (string)
password (string)
role (string)

## Artist

id (int, primary key)
name (string)
biography (text)
birthdate (date)
nationality (string)
image (string)
## Artwork

id (int, primary key)
title (string)
medium (string)
style (string)
price (decimal)
available (boolean)
artist_id (int, foreign key referencing Artist.id)
Image (string)

## Exhibition

id (int, primary key)
name (string)
start_date (date)
end_date (date)
description (text)

## Favorite
user_id (int, foreign key referencing User.id)
artwork_id (int, foreign key referencing Artwork.id)

# Inspiration
-Inspired by the desire to make art more accessible to a global audience, our gallery features diverse artworks from talented artists around the world.

-Inspired by advancements in technology, we leverage modern web development tools and frameworks to create a seamless and visually appealing online gallery 
experience.

# Deployment Link


# LICENCE 
MIT License