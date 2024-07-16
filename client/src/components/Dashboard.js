import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';
import Navbar from './Navbar';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Dashboard = () => {
    const { isAuthenticated, logout } = useAuth();
    const history = useHistory();
    const [error, setError] = useState('');

    const userData = JSON.parse(localStorage.getItem('userData'));

    const initialValues = {
        biography: '',
        nationality: '',
        image: ''
    };

    const validate = (values) => {
        const errors = {};
        if (!values.biography) {
            errors.biography = 'Required';
        }
        if (!values.nationality) {
            errors.nationality = 'Required';
        }
        if (!values.image) {
            errors.image = 'Required';
        }
        return errors;
    };

    const handleLogout = () => {
        logout();
        history.push('/login');
    };

    const handleUpdateProfile = async (values) => {
        try {
            const response = await fetch('http://127.0.0.1:5555/artists', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(values)
            });

            if (response.ok) {
                alert('Profile updated successfully');
            } else {
                const data = await response.json();
                setError(`Failed to update profile: ${data.message}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again later.');
        }
    };

    return (
        <div>
            <Navbar />
            {isAuthenticated() ? (
                <div>
                    <h1>Welcome, {userData.artist.name}</h1>
                    <div>
                        <h2>Update Profile</h2>
                        <Formik
                            initialValues={initialValues}
                            validate={validate}
                            onSubmit={handleUpdateProfile}
                        >
                            <Form>
                                <label htmlFor="biography">Biography:</label>
                                <Field as="textarea" id="biography" name="biography" />
                                <ErrorMessage name="biography" component="div" />

                                <label htmlFor="nationality">Nationality:</label>
                                <Field type="text" id="nationality" name="nationality" />
                                <ErrorMessage name="nationality" component="div" />

                                <label htmlFor="image">Image URL:</label>
                                <Field type="text" id="image" name="image" />
                                <ErrorMessage name="image" component="div" />

                                {error && <div style={{ color: 'red' }}>{error}</div>}

                                <button type="submit">Update Profile</button>
                            </Form>
                        </Formik>
                    </div>
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h1>Please log in to view your dashboard.</h1>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
