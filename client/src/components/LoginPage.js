import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Adjust the import path as necessary
import { useFormik } from 'formik'; // Import Formik
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
  const { login } = useAuth(); // Access login function from AuthContext
  const history = useHistory();

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const { success, message, role } = await login(values); // Call login function from AuthContext
        if (success) {
          if (role === 'artist') {
            history.push('/artworks');
          } else if (role === 'art enthusiast') {
            history.push('/artists');
          }
        } else {
          formik.setFieldError('email', message || 'Login failed');
          formik.setFieldError('password', message || 'Login failed');
        }
      } catch (err) {
        formik.setFieldError('email', err.response?.data?.message || 'An error occurred during login');
        formik.setFieldError('password', err.response?.data?.message || 'An error occurred during login');
      }
    },
  });

  return (
    <Container>
      <SignInContainer>
        <Form onSubmit={formik.handleSubmit}>
          <Title>Log in</Title>
          {formik.errors.email && formik.touched.email && <p style={{ color: 'red' }}>{formik.errors.email}</p>}
          <Input
            type='email'
            placeholder='Email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.errors.password && formik.touched.password && <p style={{ color: 'red' }}>{formik.errors.password}</p>}
          <Input
            type='password'
            placeholder='Password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
