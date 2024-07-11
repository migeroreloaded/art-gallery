import React, { useState } from 'react';
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
  Paragraph
} from './styles';
import { useAuth } from './AuthContext';

const RegisterPage = ({ signIn, toggle }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Container>
      <SignUpContainer signinIn={signIn}>
        <Form onSubmit={handleSubmit}>
          <Title>Create Account</Title>
          <Input
            type='text'
            placeholder='Name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign Up</Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
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
