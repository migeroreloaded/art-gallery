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

const RegisterPage = ({ signIn, toggle }) => {
  const [formData, setFormData] = useState({
    username: '',
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
      const response = await axios.post('http://localhost:5555/signup', formData);
      console.log(response.data);
      // Redirect or show success message here
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during sign up');
    }
  };

  return (
    <Container>
      <SignUpContainer signinIn={signIn}>
        <Form onSubmit={handleSubmit}>
          <Title>Create Account</Title>
          {error && <p style={{ color: 'red' }}>{error}</p>}
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
          <label htmlFor="role">Role:</label><br />
          <Select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="artist">Artist</option>
            <option value="art enthusiast">Art Enthusiast</option>
          </Select><br /><br />
          <Button type="submit">Sign Up</Button>
        </Form>
      </SignUpContainer>

      <OverlayContainer signinIn={signIn}>
        <Overlay signinIn={signIn}>
          <LeftOverlayPanel signinIn={signIn}>
            <Title>Welcome Back!</Title>
            <Paragraph>
              To keep connected with us please login with your personal info
            </Paragraph>
            <GhostButton onClick={() => toggle(true)}>
              LOG IN
            </GhostButton>
          </LeftOverlayPanel>

          <RightOverlayPanel signinIn={signIn}>
            <Title>Hello, Friend!</Title>
            <Paragraph>
              Enter your personal details and start your journey with us
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

export default RegisterPage;