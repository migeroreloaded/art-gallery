import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UpdateButton } from './styles'; // Import UpdateButton from styles

const UpdateEvent = ({ eventId, user, onUpdate }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch event details and set initial state
    axios.get(`http://localhost:5555/events/${eventId}`)
      .then(response => {
        const event = response.data;
        setName(event.name);
        setStartDate(event.start_date);
        setEndDate(event.end_date);
        setDescription(event.description);
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
        end_date: endDate,
        description,
      });
      onUpdate(); // Trigger parent component action after update (e.g., fetch latest data)
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div>
      <h2>Update Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <UpdateButton type="submit">Update Event</UpdateButton> {/* Use UpdateButton component */}
      </form>
    </div>
  );
};

export default UpdateEvent;
