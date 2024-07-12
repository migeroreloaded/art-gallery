// UpdateArtwork.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateArtwork = ({ artworkId, user, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [medium, setMedium] = useState('');
  // Other state variables

  useEffect(() => {
    // Fetch artwork details and set initial state
    axios.get(`http://localhost:5555/artworks/${artworkId}`)
      .then(response => {
        const artwork = response.data;
        setTitle(artwork.title);
        setMedium(artwork.medium);
        // Set other state variables
      })
      .catch(error => {
        console.error('Error fetching artwork:', error);
      });
  }, [artworkId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5555/artworks/${artworkId}`, {
        title,
        medium,
        // Other updated fields
      });
      onUpdate(); // Trigger parent component action after update (e.g., fetch latest data)
    } catch (error) {
      console.error('Error updating artwork:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for updating artwork */}
    </form>
  );
};

export default UpdateArtwork;
