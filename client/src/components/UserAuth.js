import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './styles.css';

const WelcomePage = () => {
  const history = useHistory();

  const handleNavigateToLogin = () => {
    history.push('/user-login');
  };

  const handleNavigateToSignUp = () => {
    history.push('/user-register');
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await fetch('https://api.example.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Handle response as needed
      console.log('Form submitted successfully:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
      setFieldError('submit', 'Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to Art Gallery</h1>
        <div className="button-container">
          <button className="welcome-button" onClick={handleNavigateToLogin}>Login</button>
          <button className="welcome-button" onClick={handleNavigateToSignUp}>Sign Up</button>
        </div>
        <div className="form-container">
          <h2>Formik Form Example</h2>
          <Formik
            initialValues={{ name: '', email: '' }}
            validate={values => {
              const errors = {};
              if (!values.name) {
                errors.name = 'Required';
              }
              if (!values.email) {
                errors.email = 'Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-field">
                  <label htmlFor="name">Name:</label>
                  <Field type="text" id="name" name="name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email:</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage name="email" component="div" className="error" />
                </div>
                <div className="form-field">
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                  {isSubmitting && <p>Submitting...</p>}
                  <ErrorMessage name="submit" component="div" className="error" />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
