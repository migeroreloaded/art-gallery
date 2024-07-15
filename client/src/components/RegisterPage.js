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
} from './styles'; // Import your styled components
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: '', // Default to 'blank'
    name: '',
    biography: '',
    birthdate: '',
    nationality: '',
    image: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5555/register', formData);
      console.log(response.data);
      if (response.data.message === 'User created successfully') {
        // Handle successful registration (e.g., redirect or set token)
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during sign up');
    }
  };

  return (
    <Container>
      <SignUpContainer>
        <Form onSubmit={handleSubmit}>
          <Title>Create Account</Title>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <label htmlFor="role">Role:</label><br />
          <Select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Choose role</option>
            <option value="art enthusiast">Art Enthusiast</option>
            <option value="artist">Artist</option>
          </Select><br /><br />
          {formData.role === '' && (
            <>
            <p>Please select a role before proceeding.</p>
            </>
          )}
          {formData.role === 'art enthusiast' && (
            <>
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
              <Input
                type='password'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </>
          )}
          {formData.role === 'artist' && (
            <>
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
              <Input
                type='password'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <Input
                type='text'
                placeholder='Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type='text'
                placeholder='Biography'
                name='biography'
                value={formData.biography}
                onChange={handleChange}
                required
              />
              <Input
                type='date'
                placeholder='Birthdate'
                name='birthdate'
                value={formData.birthdate}
                onChange={handleChange}
                required
              />
              <Input
                type='text'
                placeholder='Nationality'
                name='nationality'
                value={formData.nationality}
                onChange={handleChange}
                required
              />
              <Input
                type='text'
                placeholder='Image URL'
                name='image'
                value={formData.image}
                onChange={handleChange}
                required
              />
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
