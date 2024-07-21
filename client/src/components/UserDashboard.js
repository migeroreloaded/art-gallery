import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState('');

  const initialValues = {
    username: user.username,
    email: user.email,
    newPassword: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(`https://art-gallery-imr2.onrender.com/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.newPassword, // Assuming newPassword is the new password field
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      setUpdateSuccess(true);
    } catch (error) {
      console.error('Error updating user:', error);
      setUpdateError('Error updating user. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <button onClick={logout}>Logout</button>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validate={values => {
          const errors = {};
          if (!values.username) {
            errors.username = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          }
          if (values.newPassword !== values.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
          }
          return errors;
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username:</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component="div" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="newPassword">New Password:</label>
              <Field type="password" id="newPassword" name="newPassword" />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field type="password" id="confirmPassword" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Update Profile
            </button>
            {updateSuccess && <p>User updated successfully!</p>}
            {updateError && <p>{updateError}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserDashboard;
