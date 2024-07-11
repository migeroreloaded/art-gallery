import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    ArtistGrid,
    ArtistContainer,
    ArtistName,
    ArtistBio,
    ArtistImage,
    ArtistLoading,
    ErrorMessage
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