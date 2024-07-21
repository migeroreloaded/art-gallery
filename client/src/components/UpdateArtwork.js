import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  outline: none;
  transition: border-color 0.3s ease;
  margin-top: 5px;

  &:focus {
    border-color: #4caf50;
  }
`;

const CheckboxInput = styled.input`
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const UpdateArtwork = ({ artworkId, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [medium, setMedium] = useState('');
  const [style, setStyle] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (!artworkId) {
      return;
    }

    const fetchArtwork = async () => {
      try {
        const response = await fetch(`https://art-gallery-imr2.onrender.com/artworks/${artworkId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch artwork');
        }
        const artwork = await response.json();
        setTitle(artwork.title);
        setMedium(artwork.medium);
        setStyle(artwork.style);
        setPrice(artwork.price);
        setAvailable(artwork.available);
      } catch (error) {
        console.error('Error fetching artwork:', error);
        setError('Error fetching artwork. Please try again.');
      }
    };

    fetchArtwork();
  }, [artworkId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://art-gallery-imr2.onrender.com/artworks/${artworkId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          title,
          medium,
          style,
          price,
          available,
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update artwork');
      }

      onUpdate();
      history.push('/artworks'); // Redirect to artworks page after update
    } catch (error) {
      console.error('Error updating artwork:', error);
      setError('Error updating artwork. Please try again.');
    }
  };

  return (
    <Container>
      <h2>Update Artwork</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Title:</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Medium:</Label>
          <Input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Style:</Label>
          <Input
            type="text"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Price:</Label>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Available:</Label>
          <CheckboxInput
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
        </div>
        <Button type="submit">Update Artwork</Button>
      </Form>
    </Container>
  );
};

export default UpdateArtwork;

