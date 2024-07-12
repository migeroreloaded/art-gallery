// DeleteArtwork.js
import React from 'react';
import axios from 'axios';

const DeleteArtwork = ({ artworkId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/artworks/${artworkId}`);
      onDelete(); // Trigger parent component action after deletion (e.g., update state)
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Artwork</button>
    </div>
  );
};

export default DeleteArtwork;
