// AddArtwork.js

import React, { useState } from 'react';
import axios from './api';  // Assuming axios instance is properly configured in './api'
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

const CheckBoxLabel = styled.label`
  display: block;
  margin-top: 10px;
`;

const CheckBoxInput = styled.input`
  margin-right: 5px;
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

const AddArtwork = () => {
  const [title, setTitle] = useState('');
  const [medium, setMedium] = useState('');
  const [style, setStyle] = useState('');
  const [price, setPrice] = useState(0);
  const [imageURL, setImageURL] = useState('');
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/artworks', {
        title,
        medium,
        style,
        price,
        imageURL,
        available
      });
      setError('');
      console.log(response.data);  // Handle success
      // Reset form or navigate to another page on success
    } catch (error) {
      setError('Error adding artwork');
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Add Artwork</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputField type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <InputField type="text" placeholder="Medium" value={medium} onChange={(e) => setMedium(e.target.value)} required />
      <InputField type="text" placeholder="Style" value={style} onChange={(e) => setStyle(e.target.value)} required />
      <InputField type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <InputField type="text" placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />
      <CheckBoxLabel>
        Available:
        <CheckBoxInput type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
      </CheckBoxLabel>
      <SubmitButton type="submit">Add Artwork</SubmitButton>
    </FormContainer>
  );
};

export default AddArtwork;
