import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormInput = styled.input`
  width: calc(100% - 22px);
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormTextarea = styled.textarea`
  width: calc(100% - 22px);
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormError = styled.div`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff416c;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #ff4a6f;
  }
`;

const UpdateEvent = ({ eventId, onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const history = useHistory();

  useEffect(() => {
    // Fetch existing event details for the given eventId
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5555/exhibitions/${eventId}`);
        const eventData = response.data;
        setName(eventData.name);
        setDescription(eventData.description);
        setStartDate(eventData.start_date);
        setEndDate(eventData.end_date);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Error fetching event details. Please try again later.');
      }
    };

    fetchEventDetails();
  }, [eventId]); // Fetch details when the component mounts or eventId changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://127.0.0.1:5555/exhibitions/${eventId}`, {
        name,
        description,
        start_date: startDate,
        end_date: endDate
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      onSuccess(response.data); // Notify parent component (ExhibitionsPage) about the update
      history.push('/exhibitions'); // Redirect to exhibitions page after successful update
    } catch (error) {
      console.error('Error updating event:', error);
      setError('Error updating event. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Update Event</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <FormInput
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <FormInput
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <FormInput
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <FormTextarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <SubmitButton type="submit">Update Event</SubmitButton>
        {error && <FormError>{error}</FormError>}
      </Form>
    </div>
  );
};

export default UpdateEvent;
