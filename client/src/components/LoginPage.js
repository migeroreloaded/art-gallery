import React, { useState } from 'react';
// import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary
import {
  Container,
  SignInContainer,
  Form,
  Title,
  Input,
  Button,
  Anchor,
  OverlayContainer,
  Overlay,
  LeftOverlayPanel,
  GhostButton,
  Paragraph
} from './styles'; // Adjust import paths based on your file structure

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const history = useHistory();
  const { login } = useAuth(); // Access login function from AuthContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { success, message, role } = await login(formData); // Call login function from AuthContext
      if (success) {
        if (role === 'artist') {
          history.push('/artworks');
        } else if (role === 'art enthusiast') {
          history.push('/artists');
        }
      } else {
        setError(message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
    <Container>
      <SignInContainer>
        <Form onSubmit={handleSubmit}>
          <Title>Log in</Title>
          {error && <p style={{ color: 'red' }}>{error}</p>}
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
          <Anchor href='#'>Forgot your password?</Anchor>
          <Button type="submit">Log In</Button>
        </Form>
      </SignInContainer>

      <OverlayContainer>
        <Overlay>
          <LeftOverlayPanel>
            <Title>Welcome Back!</Title>
            <Paragraph>
              Create an account and start your journey with art
            </Paragraph>
            <GhostButton as={Link} to="/register">
              Sign Up
            </GhostButton>
          </LeftOverlayPanel>

          {/* RightOverlayPanel for another panel if needed */}
        </Overlay>
      </OverlayContainer>
    </Container>
  );
};

export default LoginPage;
