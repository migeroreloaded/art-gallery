import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import {
    ArtworkGrid,
    ArtworkContainer,
    ArtworkTitle,
    ArtworkDescription,
    ArtworkImage,
    ArtworkDetails,
    ArtworkDetail,
    ArtworkAvailability,
    ArtworkLoading,
    DeleteButton // Add DeleteButton
  } from './styles';

const Artwork = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const imageSize = 200;

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5555/artworks');
        setArtworks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        setError('Error fetching artworks. Please try again later.');
      }
    };

    fetchArtworks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/artworks/${id}`);
      setArtworks(artworks.filter(artwork => artwork.id !== id));
    } catch (error) {
      console.error('Error deleting artwork:', error);
      setError('Error deleting artwork. Please try again later.');
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Artworks</h2>
      {loading ? (
        <ArtworkLoading>Loading...</ArtworkLoading>
      ) : (
        <ArtworkGrid>
          {artworks.map(artwork => (
            <ArtworkContainer key={artwork.id}>
              <ArtworkTitle>{artwork.title}</ArtworkTitle>
              <ArtworkDescription>{artwork.description}</ArtworkDescription>
              <ArtworkImage src={artwork.image} alt={artwork.title} style={{ width: `${imageSize}px`, height: `${imageSize}px` }} />
              <ArtworkDetails>
                <ArtworkDetail>Medium: {artwork.medium}</ArtworkDetail>
                <ArtworkDetail>Price: {artwork.price}</ArtworkDetail>
                <ArtworkDetail>Style: {artwork.style}</ArtworkDetail>
              </ArtworkDetails>
              <ArtworkAvailability>Available: {artwork.available ? "Yes" : "No"}</ArtworkAvailability>
              <DeleteButton onClick={() => handleDelete(artwork.id)}>Delete</DeleteButton>
            </ArtworkContainer>
          ))}
        </ArtworkGrid>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default Artwork;
