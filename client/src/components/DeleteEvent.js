import React from 'react';

const DeleteEvent = ({ eventId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`https://art-gallery-imr2.onrender.com/events/${eventId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        onDelete(); // Trigger parent component action after deletion (e.g., update state)
      } else {
        const data = await response.json();
        console.error('Error deleting event:', data.message);
        alert('Error deleting event. Please try again.'); // Provide feedback to the user
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event. Please try again.'); // Provide feedback to the user
    }
  };

  return (
    <button onClick={handleDelete} style={buttonStyle}>Delete Event</button>
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

export default DeleteEvent;
