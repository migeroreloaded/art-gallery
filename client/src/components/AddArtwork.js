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

const AddArtwork = ({ onSuccess }) => {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      title: '',
      medium: '',
      style: '',
      price: 0,
      imageURL: '',
      available: true,
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch('http://localhost:5555/artworks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Error adding artwork');
        }

        const data = await response.json();
        onSuccess(data);
        history.push('/artworks');
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <FormTitle>Add Artwork</FormTitle>
      {formik.errors.submit && <FormError>{formik.errors.submit}</FormError>}
      <FormInput type="text" name="title" placeholder="Title" value={formik.values.title} onChange={formik.handleChange} required />
      <FormInput type="text" name="medium" placeholder="Medium" value={formik.values.medium} onChange={formik.handleChange} required />
      <FormInput type="text" name="style" placeholder="Style" value={formik.values.style} onChange={formik.handleChange} required />
      <FormInput type="number" name="price" placeholder="Price" value={formik.values.price} onChange={formik.handleChange} required />
      <FormInput type="text" name="imageURL" placeholder="Image URL" value={formik.values.imageURL} onChange={formik.handleChange} required />
      <FormCheckbox>
        Available:
        <input type="checkbox" name="available" checked={formik.values.available} onChange={formik.handleChange} />
      </FormCheckbox>
      <SubmitButton type="submit" disabled={formik.isSubmitting}>Add Artwork</SubmitButton>
    </Form>
  );
};

export default AddArtwork;
