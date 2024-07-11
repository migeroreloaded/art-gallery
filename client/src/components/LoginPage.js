import React, { useState } from 'react';
import axios from 'axios';
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
  RightOverlayPanel,
  GhostButton,
  Paragraph
} from './styles';
// Remove unused import
// import { useAuth } from './AuthContext';

const LoginPage = ({ signIn, toggle }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/login', formData);
      console.log(response.data);
      // Handle successful login (e.g., store token, redirect)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <Container>
      <SignInContainer signinIn={signIn}>
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

      <OverlayContainer signinIn={signIn}>
        <Overlay signinIn={signIn}>
          <LeftOverlayPanel signinIn={signIn}>
            <Title>Welcome Back!</Title>
            <Paragraph>
              To keep connected with us please login with your personal info
            </Paragraph>
            <GhostButton onClick={() => toggle(true)}>
              Sign In
            </GhostButton>
          </LeftOverlayPanel>

          <RightOverlayPanel signinIn={signIn}>
            <Title>Hello, Friend!</Title>
            <Paragraph>
              Enter your personal details and start your journey with art
            </Paragraph>
            <GhostButton onClick={() => toggle(false)}>
              Sign Up
            </GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
};

export default LoginPage;