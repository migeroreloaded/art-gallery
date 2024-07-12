// UpdateEvent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateEvent = ({ eventId, user, onUpdate }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  // Other state variables

  useEffect(() => {
    // Fetch event details and set initial state
    axios.get(`http://localhost:5555/events/${eventId}`)
      .then(response => {
        const event = response.data;
        setName(event.name);
        setStartDate(event.start_date);
        // Set other state variables
      })
      .catch(error => {
        console.error('Error fetching event:', error);
      });
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5555/events/${eventId}`, {
        name,
        start_date: startDate,
        // Other updated fields
      });
      onUpdate(); // Trigger parent component action after update (e.g., fetch latest data)
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for updating event */}
    </form>
  );
};

export default UpdateEvent;
