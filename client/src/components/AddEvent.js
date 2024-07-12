import React, { useState } from 'react';
import axios from 'axios';

const AddEvent = ({ user }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5555/events', {
        name,
        start_date: startDate,
        end_date: endDate,
        description
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setError('');
      // Handle success or redirect
    } catch (error) {
      setError('Error adding event');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Event</h2>
      {error && <p>{error}</p>}
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEvent;
