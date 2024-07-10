import React from 'react';
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

const LoginPage = ({ signIn, toggle }) => (
  <Container>
    <SignInContainer signinIn={signIn}>
      <Form>
        <Title>Sign in</Title>
        <Input type='email' placeholder='Email' />
        <Input type='password' placeholder='Password' />
        <Anchor href='#'>Forgot your password?</Anchor>
        <Button>Sign In</Button>
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

export default LoginPage;
