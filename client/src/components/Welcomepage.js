import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const WelcomePage = () => {
  const history = useHistory();

  const handleNavigateToLogin = () => {
    history.push('/login');
  };

  const handleNavigateToSignUp = () => {
    history.push('/register');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to Art Gallery</h1>
        <div className="button-container">
          <button className="welcome-button" onClick={handleNavigateToLogin}>Login</button>
          <button className="welcome-button" onClick={handleNavigateToSignUp}>Sign Up</button>
        </div>
      </div>
      <div className="form-container">
        <h2>Subscribe to Newsletter</h2>
        <Formik
          initialValues={{ email: '' }}
          validate={values => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const response = await fetch('http://localhost:5555/newsletter/subscribe', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              });

              if (!response.ok) {
                throw new Error('Failed to subscribe');
              }

              alert('Subscribed successfully!');
              resetForm();
            } catch (error) {
              console.error('Error subscribing to newsletter:', error);
              alert('Failed to subscribe. Please try again later.');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className="error-message" />
              <button type="submit" disabled={isSubmitting}>
                Subscribe
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WelcomePage;
