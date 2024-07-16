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

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormError = styled.p`
  color: red;
  text-align: center;
`;

const FormInput = styled.input`
  width: calc(100% - 22px);
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormCheckbox = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  input {
    margin-left: 10px;
  }
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

const AddArtwork = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [medium, setMedium] = useState('');
  const [style, setStyle] = useState('');
  const [price, setPrice] = useState(0);
  const [imageURL, setImageURL] = useState('');
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState('');

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/artworks', {
        title,
        medium,
        style,
        price,
        imageURL,
        available
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`  // Ensure token is included
        }
      });

      onSuccess(response.data);
      history.push('/artworks');

      setError('');
    } catch (error) {
      setError('Error adding artwork');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Add Artwork</FormTitle>
      {error && <FormError>{error}</FormError>}
      <FormInput type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <FormInput type="text" placeholder="Medium" value={medium} onChange={(e) => setMedium(e.target.value)} required />
      <FormInput type="text" placeholder="Style" value={style} onChange={(e) => setStyle(e.target.value)} required />
      <FormInput type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <FormInput type="text" placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />
      <FormCheckbox>
        Available:
        <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
      </FormCheckbox>
      <SubmitButton type="submit">Add Artwork</SubmitButton>
    </Form>
  );
};

export default AddArtwork;
