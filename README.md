# Art Gallery Project

## Problem Statement

### The Problem

Artists often struggle with an effective way to present their portfolios online, limiting their exposure and reach to potential buyers and art enthusiasts.
Additionally, artists face significant challenges in managing and promoting their events. Existing tools are either too fragmented or not tailored to the unique needs of artists, making it difficult to organize exhibitions and engage with their audience efficiently.

### Solution

This project provides a comprehensive, user-friendly platform that enhances visibility for artists' work and streamlines event management.
It provides a solution by combining a Flask backend with a React frontend and ensures a seamless and interactive experience for both users and artists, with a focus on accessibility and responsiveness.

The backend handles database operations using SQLAlchemy with an SQLite database, while the frontend provides a dynamic and intuitive interface.

## Demo Link

View the live project [here](art-gallery-ui.netlify.app)

## Table of Contents

- [How to Run](#how-to-run)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Backend (Server Side)](#backend-process)
    - [Frontend (Client Side)](#frontend-process)
- [Key React Components](#key-react-components)
  - [Artist.js](#artistjs)
  - [Artwork.js](#artworkjs)
  - [UseAuth.js](#useauthjs)
  - [ExhibitionPage.js](#exhibitionpagejs)
  - [LoginPage.js](#loginpagejs)
- [Routes](#routes)
  - [User Routes](#user-routes)
  - [Artist Routes](#artist-routes)
  - [Artwork Routes](#artwork-routes)
  - [Exhibition Routes](#exhibition-routes)
- [Models](#models)
  - [User Model](#user-model)
  - [Artist Model](#artist-model)
  - [Artwork Model](#artwork-model)
  - [Exhibition Model](#exhibition-model)
  - [ArtworkExhibition Model](#artworkexhibition-model)
  - [Favorite Model](#favorite-model)
- [Contributors](#contributors)
- [LICENSE](#licence)

## How to Run

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm 6+
- PostgreSQL or SQLite (for development)

### Installation

#### Backend Process

Open a new terminal and follow the steps below.

1. Clone this repository using

    ```bash
    git clone git@github.com:migeroreloaded/art-gallery.git
    ```

    or by downloading a ZIP file of the code.
  
2. The repository, if downloaded as a .zip file will need to be extracted to your preferred location.

3. Navigate to the project folder on your bash terminal.

    ```bash
    cd art-gallery
    ```

4. Install dependancies and create a virtual environment

    ```bash
    pipenv install
    pipenv shell
    ```

5. Run database migrations

    ```bash
    flask db init
    flask db migrate -m "Initial migration."
    flask db upgrade
    ```

6. Run the server on [`localhost:5555/`](localhost:5555/) using

    ```bash
      python server/app.py
    ```

#### Frontend Process

1. Navigate to frontend directory

    ```bash
    cd client
    ```

2. Install the required packages

    ```bash
    npm install
    ```

3. Run the development server

    ```bash
    npm start
    ```

## Key React Components

### Artist.js

Manages artist information such as name, biography, birthdate, and nationality.CRUD operations for managing artists in the art gallery.

### Artwork.js

Handles artwork details including title, medium, style, price, and availability. Provides functionality for CRUD operations related to artworks.

### UseAuth.js

Contains reusable components and utilities related to user authentication and authorization throughout the application.

### ExhibitionPage.js

Deals with exhibition details such as name, dates, and description. Provides functionality for CRUD operations related to exhibitions held in the art gallery.

### LoginPage.js

Responsible for user authentication and login functionality. It interacts with the backend to authenticate users and manage login sessions.

## Routes

### User Routes

GET /users: Retrieve a list of users.
POST /users: Create a new user.

### Artist Routes

GET /artists: Retrieve a list of artists.
POST /artists: Create a new artist.
PUT /artists: Update an existing artist.
DELETE /artists: Delete an artist.

### Artwork Routes

GET /artworks: Retrieve a list of artworks.
POST /artworks: Create a new artwork.
PUT /artworks: Update an existing artwork.
DELETE /artworks: Delete an artwork.

### Exhibition Routes

GET /exhibitions: Retrieve a list of exhibitions.
POST /exhibitions: Create a new exhibition.
PUT /exhibitions: Update an existing exhibition.
DELETE /exhibitions: Delete an exhibition.

## Models

### User Model

- **Attributes:**
  - `id`: Primary key, unique identifier for each user.
  - `email`: User's email address, unique and cannot be null.
  - `password`: User's hashed password, cannot be null.
  - `role`: Role of the user (e.g., 'admin', 'artist', 'user').

- **Relationships:**
  - `artist`: One-to-one relationship with `Artist` model via `user_id` foreign key in `Artist` model.
  - `favorites`: One-to-many relationship with `Favorite` model via `user_id` foreign key in `Favorite` model.

- **Methods:**
  - `to_dict()`: Converts the User object to a dictionary format for serialization, including nested artist details if present.

### Artist Model

- **Attributes:**
  - `id`: Primary key, unique identifier for each artist.
  - `name`: Artist's name.
  - `biography`: Biography or description of the artist (nullable).
  - `birthdate`: Date of birth of the artist.
  - `nationality`: Nationality of the artist.
  - `image`: URL or path to the artist's image.
  - `user_id`: Foreign key referencing the `id` column in the `users` table, indicating which user this artist profile belongs to.

- **Relationships:**
  - `artworks`: One-to-many relationship with `Artwork` model via `artist_id` foreign key in `Artwork` model.

- **Methods:**
  - `to_dict()`: Converts the Artist object to a dictionary format for serialization, including birthdate formatted as ISO 8601.

### Artwork Model

- **Attributes:**
  - `id`: Primary key, unique identifier for each artwork.
  - `title`: Title of the artwork.
  - `medium`: Medium or material used for the artwork (e.g., oil on canvas).
  - `style`: Artistic style of the artwork (e.g., abstract, impressionistic).
  - `price`: Price of the artwork, stored as a decimal.
  - `available`: Boolean indicating whether the artwork is available for sale.
  - `artist_id`: Foreign key referencing the `id` column in the `artists` table, indicating which artist created this artwork.
  - `image`: URL or path to the artwork's image.

- **Relationships:**
  - `exhibitions`: Many-to-many relationship with `Exhibition` model via the `ArtworkExhibition` association table.
  - `favorites`: One-to-many relationship with `Favorite` model via `artwork_id` foreign key in `Favorite` model.

- **Methods:**
  - `to_dict()`: Converts the Artwork object to a dictionary format for serialization, ensuring the price is converted to float.

### Exhibition Model

- **Attributes:**
  - `id`: Primary key, unique identifier for each exhibition.
  - `name`: Name or title of the exhibition.
  - `start_date`: Start date of the exhibition.
  - `end_date`: End date of the exhibition.
  - `description`: Description or details about the exhibition (nullable).
  - `artist_id`: Foreign key referencing the `id` column in the `artists` table, indicating which artist organized or participated in this exhibition.

- **Relationships:**
  - `artworks`: Many-to-many relationship with `Artwork` model via the `ArtworkExhibition` association table.

- **Methods:**
  - `to_dict()`: Converts the Exhibition object to a dictionary format for serialization, formatting dates as ISO 8601.

### ArtworkExhibition Model

- **Attributes:**
  - `artwork_id`: Foreign key referencing the `id` column in the `artworks` table, forming part of the composite primary key.
  - `exhibition_id`: Foreign key referencing the `id` column in the `exhibitions` table, forming part of the composite primary key.

- **Relationships:**
  - This model serves as an association table to establish a many-to-many relationship between `Artwork` and `Exhibition`.

- **Methods:**
  - `to_dict()`: Converts the ArtworkExhibition object to a dictionary format for serialization, including both foreign key references.

### Favorite Model

- **Attributes:**
  - `user_id`: Foreign key referencing the `id` column in the `users` table, forming part of the composite primary key.
  - `artwork_id`: Foreign key referencing the `id` column in the `artworks` table, forming part of the composite primary key.

- **Relationships:**
  - This model establishes a many-to-many relationship between `User` and `Artwork`, indicating which artworks each user has favorited.

- **Methods:**
  - `to_dict()`: Converts the Favorite object to a dictionary format for serialization, including both foreign key references.

## Contributors

- [Brimin KIpkorir](https://github.com/briimiin)
- [Elvis Moses](https://github.com/7Unfazed)
- [Paul Saitabau](https://github.com/PaulSaitabau)
- [Brenda Cheptoo](https://github.com/brendacheptoo525)
- [Michael George](https://github.com/migeroreloaded)

## LICENCE

MIT License
