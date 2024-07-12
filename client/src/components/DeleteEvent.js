// DeleteEvent.js
import React from 'react';
import axios from 'axios';

const DeleteEvent = ({ eventId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/events/${eventId}`);
      onDelete(); // Trigger parent component action after deletion (e.g., update state)
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Event</button>
    </div>
  );
};

export default DeleteEvent;
