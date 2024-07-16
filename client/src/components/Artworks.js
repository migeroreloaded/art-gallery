import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import AddArtwork from './AddArtwork'; // Ensure AddArtwork is imported
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
  DeleteButton,
  UpdateButton
} from './styles';
import { useAuth } from './AuthContext';
import UpdateArtwork from './UpdateArtwork'; // Ensure UpdateArtwork is imported

const Artwork = () => {
  const { isAuthenticated, authToken, userData } = useAuth(); // Access authToken from useAuth
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedArtworkId, setSelectedArtworkId] = useState(null); // Added to manage the selected artwork for updates
  const imageSize = 200;

  // Fetch artworks using fetch()
  const fetchArtworks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/artworks');
      if (!response.ok) {
        throw new Error('Failed to fetch artworks');
      }
      const data = await response.json();
      setArtworks(data);
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

  // Handle artwork deletion
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/artworks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete artwork');
      }
      setArtworks(artworks.filter(artwork => artwork.id !== id));
    } catch (error) {
      console.error('Error deleting artwork:', error);
      setError('Error deleting artwork. Please try again later.');
    }
  };

  // Handle successful creation of artwork
  const handleCreateSuccess = (newArtwork) => {
    setArtworks([...artworks, newArtwork]);
  };

  // Handle successful update of artwork
  const handleUpdateSuccess = () => {
    fetchArtworks(); // Refetch artworks after successful update
    setSelectedArtworkId(null); // Clear the selected artwork for update
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
