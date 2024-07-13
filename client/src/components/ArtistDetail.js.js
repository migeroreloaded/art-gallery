import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import './ArtistDetail.css'; // Import CSS file for additional styling

const ArtistDetail = ({ match }) => {
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtist = async () => {
            const artistId = match.params.id; // Get artist ID from URL params
            try {
                const response = await axios.get(`http://127.0.0.1:5555/artists/${artistId}`);
                setArtist(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching artist:', error);
                setError('Error fetching artist details. Please try again later.');
                setLoading(false);
            }
        };

        fetchArtist();
    }, [match.params.id]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="artist-detail-container">
            <Navbar />
            {artist && (
                <div className="artist-detail">
                    <div className="artist-header">
                        <h2 className="artist-name">{artist.name}</h2>
                        <img 
                            src={artist.image}
                            alt={artist.name} 
                            className="artist-image"
                        />
                    </div>
                    <div className="artist-info">
                        <h3 className="artist-birthdate">Born on: {artist.birthdate}</h3>
                        <h3 className="artist-nationality">Nationality: {artist.nationality}</h3>
                        <p className="artist-biography">{artist.biography}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArtistDetail;
