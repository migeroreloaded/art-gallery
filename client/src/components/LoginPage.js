import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/login', formData)
      .then(response => {
        if (response.data.message === 'Login successful') {
          const { role } = response.data.user;
          if (role === 'artist') {
            history.push('/artworks');
          } else if (role === 'art enthusiast') {
            history.push('/artists');
          }
        } else {
          alert(response.data.message);
        }
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
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
