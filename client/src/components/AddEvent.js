import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Assuming React Router is used for navigation

const CreateEvent = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5555/exhibitions', {
        name,
        description,
        start_date: startDate,
        end_date: endDate
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`  // Ensure token is included
        }
      });

      onSuccess(response.data); // Notify parent component (ExhibitionsPage) about the new event
      history.push('/exhibitions'); // Redirect to exhibitions page after successful creation
    } catch (error) {
      console.error('Error creating event:', error);
      setError('Error creating event. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" required />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <button type="submit">Create Event</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default CreateEvent;
