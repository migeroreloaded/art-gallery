import React from 'react';
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

const CreateEvent = ({ onSuccess }) => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: ''
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch('https://art-gallery-imr2.onrender.com/exhibitions', {
          method: 'POST',
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
          throw new Error('Error creating event');
        }

        const data = await response.json();
        onSuccess(data);
        history.push('/exhibitions');
      } catch (error) {
        console.error('Error creating event:', error);
        setErrors({ submit: 'Error creating event. Please try again later.' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormInput
        type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        placeholder="Event Name"
        required
      />
      <FormTextarea
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        placeholder="Event Description"
        required
      />
      <FormInput
        type="date"
        name="startDate"
        value={formik.values.startDate}
        onChange={formik.handleChange}
        required
      />
      <FormInput
        type="date"
        name="endDate"
        value={formik.values.endDate}
        onChange={formik.handleChange}
        required
      />
      <SubmitButton type="submit" disabled={formik.isSubmitting}>Create Event</SubmitButton>
      {formik.errors.submit && <FormError>{formik.errors.submit}</FormError>}
    </Form>
  );
};

export default CreateEvent;
