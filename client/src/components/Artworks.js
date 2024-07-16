import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import AddArtwork from './AddArtwork';
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
  DeleteButton,  // Import DeleteButton from styles
  UpdateButton  // Import UpdateButton from styles
} from './styles';
import { useAuth } from './AuthContext';
import UpdateArtwork from './UpdateArtwork';  // Ensure UpdateArtwork is imported

const Artwork = () => {
  const { isAuthenticated, userData } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedArtworkId, setSelectedArtworkId] = useState(null); // Added to manage the selected artwork for updates
  const imageSize = 200;

  // Define the fetchArtworks function
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

  // Call fetchArtworks on component mount
  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/artworks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setArtworks(artworks.filter(artwork => artwork.id !== id));
    } catch (error) {
      console.error('Error deleting artwork:', error);
      setError('Error deleting artwork. Please try again later.');
    }
  };

  const handleCreateSuccess = (newArtwork) => {
    setArtworks([...artworks, newArtwork]);
  };

  const handleUpdateSuccess = () => {
    fetchArtworks();  // Refetch artworks after successful update
    setSelectedArtworkId(null);  // Clear the selected artwork for update
  };

  return (
    <div>
      <Navbar />
      <h2>Artworks</h2>
      {isAuthenticated() && userData.role === 'artist' && (
        <AddArtwork onSuccess={handleCreateSuccess} />
      )}
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
              {isAuthenticated() && userData.role === 'artist' && artwork.artist_id === userData.artist.user_id && (
                <>
                  <DeleteButton onClick={() => handleDelete(artwork.id)}>Delete</DeleteButton>
                  <UpdateButton onClick={() => setSelectedArtworkId(artwork.id)}>Update</UpdateButton>
                </>
              )}
            </ArtworkContainer>
          ))}
        </ArtworkGrid>
      )}
      {error && <div>{error}</div>}
      {selectedArtworkId && (
        <UpdateArtwork artworkId={selectedArtworkId} onUpdate={handleUpdateSuccess} />
      )}
    </div>
  );
};

export default Artwork;
