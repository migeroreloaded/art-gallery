// LoginPage.js

import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';
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
} from './styles'; // Adjust import paths based on your file structure

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, role, message } = await login(formData);
    if (success) {
      history.push(`/dashboard/${role}`);
    } else {
      setError(message);
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

          <RightOverlayPanel>
            <Title>Hello, Friend!</Title>
            <Paragraph>
              Enter your personal details and start your journey with art
            </Paragraph>
            <GhostButton as={Link} to="/register">
              Sign Up
            </GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
};

export default LoginPage;
