import React, { useState } from 'react';
import { useFormik } from 'formik';
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
} from './styles'; // Import your styled components
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      name: '',
      biography: '',
      birthdate: '',
      nationality: '',
      image: ''
    },
    validate: values => {
      const errors = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }

      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }

      if (values.role === '') {
        errors.role = 'Required';
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('https://art-gallery-imr2.onrender.com/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessMessage('User signed up successfully');
          setError('');
          console.log(data);
          // Handle successful registration (e.g., redirect or set token)
        } else {
          setSuccessMessage('');
          setError(data.message || 'Registration failed');
        }
      } catch (err) {
        console.error('Error during sign up:', err);
        setError('An error occurred during sign up. Please try again later.');
        setSuccessMessage('');
      }
    }
  });

  return (
    <Container>
      <SignUpContainer>
        <Form onSubmit={formik.handleSubmit}>
          <Title>Create Account</Title>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <label htmlFor="role">Role:</label><br />
          <Select
            id="role"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Choose role</option>
            <option value="art enthusiast">Art Enthusiast</option>
            <option value="artist">Artist</option>
          </Select>
          {formik.touched.role && formik.errors.role ? (
            <div style={{ color: 'red' }}>{formik.errors.role}</div>
          ) : null}
          {formik.values.role === 'art enthusiast' && (
            <>
              <Input
                type='email'
                placeholder='Email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              ) : null}
              <Input
                type='password'
                placeholder='Password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              ) : null}
              <Input
                type='password'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
              ) : null}
            </>
          )}
          {formik.values.role === 'artist' && (
            <>
              <Input
                type='email'
                placeholder='Email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              ) : null}
              <Input
                type='password'
                placeholder='Password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              ) : null}
              <Input
                type='password'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
              ) : null}
              <Input
                type='text'
                placeholder='Name'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: 'red' }}>{formik.errors.name}</div>
              ) : null}
              <Input
                type='text'
                placeholder='Biography'
                name='biography'
                value={formik.values.biography}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.biography && formik.errors.biography ? (
                <div style={{ color: 'red' }}>{formik.errors.biography}</div>
              ) : null}
              <Input
                type='date'
                placeholder='Birthdate'
                name='birthdate'
                value={formik.values.birthdate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.birthdate && formik.errors.birthdate ? (
                <div style={{ color: 'red' }}>{formik.errors.birthdate}</div>
              ) : null}
              <Input
                type='text'
                placeholder='Nationality'
                name='nationality'
                value={formik.values.nationality}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.nationality && formik.errors.nationality ? (
                <div style={{ color: 'red' }}>{formik.errors.nationality}</div>
              ) : null}
              <Input
                type='text'
                placeholder='Image URL'
                name='image'
                value={formik.values.image}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.image && formik.errors.image ? (
                <div style={{ color: 'red' }}>{formik.errors.image}</div>
              ) : null}
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

export default RegisterForm;
