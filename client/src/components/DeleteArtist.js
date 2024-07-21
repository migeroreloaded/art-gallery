import React from 'react';

const DeleteArtist = ({ artistId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://art-gallery-imr2.onrender.com/artists/${artistId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        onDelete(); // Trigger parent component action after deletion (e.g., update state)
      } else {
        const data = await response.json();
        console.error('Error deleting artist:', data.message);
      }
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
