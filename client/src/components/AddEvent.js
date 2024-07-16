import React, { useState } from 'react';
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
      const response = await axios.post('http://localhost:5555/exhibitions', {
        name,
        description,
        start_date: startDate,
        end_date: endDate
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`  // Ensure token is included
        }
      });

      onSuccess(response.data);
      history.push('/exhibitions');

      setError('');
    } catch (error) {
      console.error('Error creating event:', error);
      setError('Error creating event. Please try again later.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormInput type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Event Name" required />
      <FormTextarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Event Description" required />
      <FormInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <FormInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <SubmitButton type="submit">Create Event</SubmitButton>
      {error && <FormError>{error}</FormError>}
    </Form>
  );
};

export default CreateEvent;
