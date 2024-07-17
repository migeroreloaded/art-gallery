import React from 'react';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  width: 80%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; // Add this line


`;

const Form = styled.form`
  padding: 20px;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const FormError = styled.p`
  color: red;
  text-align: center;
`;

const FormInput = styled.input`
  width: calc(100% - 22px);
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormCheckbox = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  input {
    margin-left: 10px;
  }
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

const AddEvent = ({ onSuccess }) => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: '',
      date: '',
      location: '',
      description: '',
      imageURL: '',
      isPublic: true,
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch('http://localhost:5555/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Error adding event');
        }

        const data = await response.json();
        onSuccess(data);
        history.push('/events');
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card>
      <Form onSubmit={formik.handleSubmit}>
        <FormTitle>Add Event</FormTitle>
        {formik.errors.submit && <FormError>{formik.errors.submit}</FormError>}
        <FormInput type="text" name="name" placeholder="Name" value={formik.values.name} onChange={formik.handleChange} required />
        <FormInput type="date" name="date" placeholder="Date" value={formik.values.date} onChange={formik.handleChange} required />
        <FormInput type="text" name="location" placeholder="Location" value={formik.values.location} onChange={formik.handleChange} required />
        <FormInput type="text" name="description" placeholder="Description" value={formik.values.description} onChange={formik.handleChange} required />
        <FormInput type="text" name="imageURL" placeholder="Image URL" value={formik.values.imageURL} onChange={formik.handleChange} required />
        <FormCheckbox>
          Public:
          <input type="checkbox" name="isPublic" checked={formik.values.isPublic} onChange={formik.handleChange} />
        </FormCheckbox>
        <SubmitButton type="submit" disabled={formik.isSubmitting}>Add Event</SubmitButton>
      </Form>
    </Card>
  );
};

export default AddEvent;
