// DeleteArtist.js
import React from 'react';
import axios from 'axios';

const DeleteArtist = ({ artistId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/artists/${artistId}`);
      onDelete(); // Trigger parent component action after deletion (e.g., update state)
    } catch (error) {
      console.error('Error deleting artist:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Artist</button>
    </div>
  );
};

export default DeleteArtist;
