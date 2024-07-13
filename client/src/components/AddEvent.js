// AddEvent.js

import React, { useState } from 'react';
import axios from './api';
import styled from 'styled-components';

// Styled components
const FormContainer = styled.form`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const TextAreaField = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

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
    <FormContainer onSubmit={handleSubmit}>
      <Title>Add Event</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputField type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <InputField type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <InputField type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <TextAreaField placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <SubmitButton type="submit">Add Event</SubmitButton>
    </FormContainer>
  );
};

export default AddEvent;
