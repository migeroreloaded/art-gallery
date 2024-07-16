import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './ArtistDetail.css'; // Import CSS file for additional styling
import { useFormik } from 'formik';

const ArtistDetail = ({ match }) => {
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchArtist = async (artistId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5555/artists/${artistId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const data = await response.json();
            setArtist(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching artist:', error);
            setError('Error fetching artist details. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        const artistId = match.params.id; // Get artist ID from URL params
        fetchArtist(artistId);
    }, [match.params.id]);

    const formik = useFormik({
        initialValues: {
            id: ''
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await fetch(`http://127.0.0.1:5555/artists/${values.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                const data = await response.json();
                setArtist(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching artist:', error);
                setError('Error fetching artist details. Please try again later.');
                setLoading(false);
            } finally {
                setSubmitting(false);
            }
        },
    });

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
