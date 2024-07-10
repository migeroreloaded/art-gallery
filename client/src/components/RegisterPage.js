import React from 'react';
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

const RegisterPage = ({ signIn, toggle }) => (
  <Container>
    <SignUpContainer signinIn={signIn}>
      <Form>
        <Title>Create Account</Title>
        <Input type='text' placeholder='Name' />
        <Input type='email' placeholder='Email' />
        <Input type='password' placeholder='Password' />
        <Button>Sign Up</Button>
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
            Sign In
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

export default RegisterPage;
