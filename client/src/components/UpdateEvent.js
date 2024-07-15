import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateEvent = ({ eventId, onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5555/exhibitions/${eventId}`);
        const eventData = response.data;
        setName(eventData.name);
        setDescription(eventData.description);
        setStartDate(eventData.start_date);
        setEndDate(eventData.end_date);
      } catch (error) {
        console.error('Error fetching event:', error);
        setError('Error fetching event details. Please try again later.');
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://127.0.0.1:5555/exhibitions/${eventId}`, {
        name,
        description,
        start_date: startDate,
        end_date: endDate
      });

      onSuccess(); // Notify parent component (ExhibitionsPage) about the update
    } catch (error) {
      console.error('Error updating event:', error);
      setError('Error updating event. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" required />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <button type="submit">Update Event</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default UpdateEvent;
