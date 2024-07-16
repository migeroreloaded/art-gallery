import React from 'react';
import axios from 'axios';

// Define the DeleteArtwork component
const DeleteArtwork = ({ artworkId, onDelete }) => {
  // Function to handle the delete action
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/artworks/${artworkId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,  // Ensure token is included
        },
      });
      onDelete(); // Notify parent component of successful deletion
    } catch (error) {
      console.error('Error deleting artwork:', error);
      alert('Error deleting artwork. Please try again.');  // Provide feedback to the user
    }
  };

  return (
    <button onClick={handleDelete} style={buttonStyle}>Delete Artwork</button>  // Use inline style or imported style
  );
};

// Define button styles
const buttonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
  marginRight: '5px'
};

// Export the component
export default DeleteArtwork;
