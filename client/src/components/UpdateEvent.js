import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormInput = styled.input`
  width: calc(100% - 22px);
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormTextarea = styled.textarea`
  width: calc(100% - 22px);
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormError = styled.div`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff416c;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #ff4a6f;
  }
`;

const UpdateEvent = ({ eventId, onSuccess }) => {
  const [error, setError] = useState('');
  const history = useHistory();

  // Initialize useFormik outside of useEffect
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: ''
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(`https://art-gallery-imr2.onrender.com/exhibitions/${eventId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({
            name: values.name,
            description: values.description,
            start_date: values.startDate,
            end_date: values.endDate
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update');
        }

        onSuccess(); // Notify parent component (ExhibitionsPage) about the update
        history.push('/exhibitions'); // Redirect to exhibitions page after successful update
      } catch (error) {
        console.error('Error updating event:', error);
        setError('Error updating event. Please try again later.');
      }
    },
  });

  useEffect(() => {
    // Fetch existing event details for the given eventId
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`https://art-gallery-imr2.onrender.com/exhibitions/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const eventData = await response.json();
        formik.setValues({
          name: eventData.name,
          description: eventData.description,
          startDate: eventData.start_date,
          endDate: eventData.end_date
        });
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError('Error fetching event details. Please try again later.');
      }
    };

    fetchEventDetails();
  }, [eventId, formik]); // Fetch details when the component mounts or eventId changes, and include formik

  return (
    <div>
      <h2>Update Event</h2>
      <Form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <FormInput
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <FormInput
            type="date"
            id="startDate"
            name="startDate"
            value={formik.values.startDate}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <FormInput
            type="date"
            id="endDate"
            name="endDate"
            value={formik.values.endDate}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <FormTextarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            required
          />
        </div>
        <SubmitButton type="submit">Update Event</SubmitButton>
        {error && <FormError>{error}</FormError>}
      </Form>
    </div>
  );
};

export default UpdateEvent;
