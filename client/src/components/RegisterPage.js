import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'art enthusiast', // Default to 'art enthusiast'
    name: '',
    biography: '',
    birthdate: '',
    nationality: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    axios.post('/register', formData)
      .then(response => {
        alert(response.data.message);
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      >
        <option value="art enthusiast">Art Enthusiast</option>
        <option value="artist">Artist</option>
      </select>
      {formData.role === 'artist' && (
        <>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="biography"
            placeholder="Biography"
            value={formData.biography}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="birthdate"
            placeholder="Birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nationality"
            placeholder="Nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </>
      )}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
