import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UpdateButton } from './styles';  // Ensure UpdateButton is imported from styles

const UpdateArtwork = ({ artworkId, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [medium, setMedium] = useState('');
  const [style, setStyle] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!artworkId) {
      return; // Don't make the API call if artworkId is undefined
    }

    axios.get(`http://localhost:5555/artworks/${artworkId}`)
      .then(response => {
        const artwork = response.data;
        setTitle(artwork.title);
        setMedium(artwork.medium);
        setStyle(artwork.style);
        setPrice(artwork.price);
        setAvailable(artwork.available);
      })
      .catch(error => {
        console.error('Error fetching artwork:', error);
        setError('Error fetching artwork. Please try again.');
      });
  }, [artworkId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!artworkId) {
      console.error('ArtworkId is undefined.');
      return;
    }

    try {
      await axios.put(`http://localhost:5555/artworks/${artworkId}`, {
        title,
        medium,
        style,
        price,
        available,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      onUpdate(); // Trigger parent component action after update (e.g., fetch latest data)
    } catch (error) {
      console.error('Error updating artwork:', error);
      setError('Error updating artwork. Please try again.');
    }
  };

  return (
    <div>
      <h2>Update Artwork</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Medium:</label>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Style:</label>
          <input
            type="text"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Available:</label>
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
        </div>
        <UpdateButton type="submit">Update Artwork</UpdateButton>
      </form>
    </div>
  );
};

export default UpdateArtwork;
