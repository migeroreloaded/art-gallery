import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateArtwork = ({ artworkId, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [medium, setMedium] = useState('');
  const [style, setStyle] = useState('');
  const [price, setPrice] = useState('');
  const [available, setAvailable] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!artworkId) {
      return; // Don't make the API call if artworkId is undefined
    }

    axios.get(`http://localhost:5555/artworks/${artworkId}`)
      .then(response => {
        const artwork = response.data;
        setTitle(artwork.title);
        setMedium(artwork.medium);
        setStyle(artwork.style);
        setPrice(artwork.price);
        setAvailable(artwork.available);
      })
      .catch(error => {
        console.error('Error fetching artwork:', error);
        setError('Error fetching artwork. Please try again.');
      });
  }, [artworkId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!artworkId) {
      console.error('ArtworkId is undefined.');
      return;
    }

    try {
      await axios.put(`http://localhost:5555/artworks/${artworkId}`, {
        title,
        medium,
        style,
        price,
        available,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      onUpdate(); // Trigger parent component action after update (e.g., fetch latest data)
    } catch (error) {
      console.error('Error updating artwork:', error);
      setError('Error updating artwork. Please try again.');
    }
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '3px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
    marginTop: '5px',
    ':focus': {
      borderColor: '#4caf50',
    }
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
  };

  const buttonStyle = {
    padding: '12px 20px',
    fontSize: '1rem',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
    ':hover': {
      backgroundColor: '#45a049',
    }
  };

  const errorStyle = {
    color: 'red',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      <h2>Update Artwork</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form style={formStyle} onSubmit={handleSubmit}>
        <div>
          <label style={labelStyle}>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Medium:</label>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Style:</label>
          <input
            type="text"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Available:</label>
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
        </div>
        <button type="submit" style={buttonStyle}>Update Artwork</button>
      </form>
    </div>
  );
};

export default UpdateArtwork;
