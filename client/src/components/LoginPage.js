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
import { useAuth } from './AuthContext';

const LoginPage = () => {
  const { login } = useAuth(); // Assuming login function is available from AuthContext
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
      if (response.data.success) {
        login(response.data.token); // Assuming login function sets authentication token
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
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
              To keep connected with us please login with your personal info
            </Paragraph>
            <GhostButton to="/register">
              Sign Up
            </GhostButton>
          </LeftOverlayPanel>

          <RightOverlayPanel>
            <Title>Hello, Friend!</Title>
            <Paragraph>
              Enter your personal details and start your journey with art
            </Paragraph>
            <GhostButton to="/register">
              Sign Up
            </GhostButton>
          </RightOverlayPanel>
        </Overlay>
      </OverlayContainer>
    </Container>
  );
};

export default LoginPage;
