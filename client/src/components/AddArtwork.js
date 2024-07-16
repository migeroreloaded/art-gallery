import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
    <form onSubmit={handleSubmit}>
      <h2>Add Artwork</h2>
      {error && <p>{error}</p>}
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Medium" value={medium} onChange={(e) => setMedium(e.target.value)} required />
      <input type="text" placeholder="Style" value={style} onChange={(e) => setStyle(e.target.value)} required />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input type="text" placeholder="Image URL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} required />
      <label>
        Available:
        <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
      </label>
      <button type="submit">Add Artwork</button>
    </form>
  );
};

export default AddArtwork;
