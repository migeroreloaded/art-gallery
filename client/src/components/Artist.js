import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import {
    ArtistGrid,
    ArtistContainer,
    ArtistName,
    ArtistBio,
    ArtistImage,
    ArtistLoading,
    ErrorMessage,
    DeleteButton // Add DeleteButton
} from './styles';

const Artist = () => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5555/artists');
                setArtists(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching artists. Please try again later.');
                setLoading(false);
            }
        };

        fetchArtists();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5555/artists/${id}`);
            setArtists(artists.filter(artist => artist.id !== id));
        } catch (error) {
            console.error('Error deleting artist:', error);
            setError('Error deleting artist. Please try again later.');
        }
    };

    return (
        <div>
            <Navbar />
            <h2>Artists</h2>
            {loading ? (
                <ArtistLoading>Loading...</ArtistLoading>
            ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : (
                <ArtistGrid>
                    {artists.map(artist => (
                        <ArtistContainer key={artist.id}>
                            <Link to={`/artists/${artist.id}`}>
                                <ArtistName>{artist.name}</ArtistName>
                            </Link>
                            <ArtistBio>{artist.bio}</ArtistBio>
                            <ArtistImage src={artist.image} alt={artist.name} />
                            <DeleteButton onClick={() => handleDelete(artist.id)}>Delete</DeleteButton>
                        </ArtistContainer>
                    ))}
                </ArtistGrid>
            )}
        </div>
    );
};

export default Artist;
