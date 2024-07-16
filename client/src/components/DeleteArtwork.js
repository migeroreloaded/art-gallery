import React from 'react';

const DeleteArtwork = ({ artworkId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5555/artworks/${artworkId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        onDelete(); // Notify parent component of successful deletion
      } else {
        const data = await response.json();
        console.error('Error deleting artwork:', data.message);
        alert('Error deleting artwork. Please try again.'); // Provide feedback to the user
      }
    } catch (error) {
      console.error('Error deleting artwork:', error);
      alert('Error deleting artwork. Please try again.'); // Provide feedback to the user
    }
  };

  return (
    <button onClick={handleDelete} style={buttonStyle}>Delete Artwork</button>
  );
};

const buttonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
  marginRight: '5px'
};

export default DeleteArtwork;
