import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  SignUpContainer,
  Form,
  Title,
  Input,
  Button,
  OverlayContainer,
  Overlay,
  LeftOverlayPanel,
  RightOverlayPanel,
  GhostButton,
  Paragraph,
  Select
} from './styles';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const { register } = useAuth(); // Assuming register function is available from AuthContext
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'artist' // Default value
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/register', formData);
      console.log(response.data);
      if (response.data.message === 'User created successfully') {
        register(response.data.token); // Assuming register function sets authentication token
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during sign up');
    }
  };

  return (
    <Container>
      <SignUpContainer>
        <Form onSubmit={handleSubmit}>
          <Title>Create Account</Title>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <label htmlFor="role">Role:</label><br />
          <Select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Choose role</option>
            <option value="artist">Artist</option>
            <option value="art enthusiast">Art Enthusiast</option>
          </Select><br /><br />
          {formData.role === '' && (
            <>
            <p>Please select a role before proceeding.</p>
            </>
          )}
          {formData.role === 'art enthusiast' && (
            <>
            <Input
                type='text'
                placeholder='Username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
              />
              <Input
                type='email'
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type='password'
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </>
          )}
          {formData.role === 'artist' &&(
            <>
            <Input
                type='text'
                placeholder='Username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                required
              />
              <Input
                type='email'
                placeholder='Email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type='password'
                placeholder='Password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Input
                type='text'
                placeholder='Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type='text'
                placeholder='Biography'
                name='biography'
                value={formData.biography}
                onChange={handleChange}
                required
              />
              <Input
                type='date'
                placeholder='Birthdate'
                name='birthdate'
                value={formData.birthdate}
                onChange={handleChange}
                required
              />
              <Input
                type='text'
                placeholder='Nationality'
                name='nationality'
                value={formData.nationality}
                onChange={handleChange}
                required
              />
              <Input
                type='text'
                placeholder='Image URL'
                name='image'
                value={formData.image}
                onChange={handleChange}
                required
              />
              {/* Add other artist-specific fields */}
            </>
          )}
          <Button type="submit">Sign Up</Button>
        </Form>
      </SignUpContainer>

      <OverlayContainer>
        <Overlay>
          <LeftOverlayPanel>
            <Title>Hello Friend!!</Title>
            <Paragraph>
             To keep connected with us please login
            </Paragraph>
            <GhostButton as={Link} to="/login">
              LOG IN
            </GhostButton>
          </LeftOverlayPanel>

          <RightOverlayPanel>
            <Title>Hello, Friend!</Title>
            <Paragraph>
              Enter your personal details and start your journey with us
            </Paragraph>
            <GhostButton as={Link} to="/login">
              LOG IN
            </GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
};

export default RegisterPage;
