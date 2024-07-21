import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
// import CreateEvent from './AddEvent'; // Assuming this is your component for adding exhibitions
import UpdateEvent from './UpdateEvent';
import { PageContainer, Header, ExhibitionList, ExhibitionCard, ExhibitionTitle, ExhibitionDescription, Footer, DeleteButton } from './styles';
import { useAuth } from './AuthContext';
import { useFormik } from 'formik';

const ExhibitionsPage = () => {
  const { isAuthenticated, userData } = useAuth();
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Formik Setup for CreateEvent form
  const formikCreateEvent = useFormik({
    initialValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: ''
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('https://art-gallery-imr2.onrender.com/exhibitions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({
            name: values.name,
            description: values.description,
            start_date: values.startDate,
            end_date: values.endDate
          })
        });

        if (response.ok) {
          const newEvent = await response.json();
          handleCreateSuccess(newEvent);
          resetForm();
        } else {
          const data = await response.json();
          console.error('Failed to create event:', data.message);
          alert('Failed to create event. Please try again.');
        }
      } catch (error) {
        console.error('Error creating event:', error);
        alert('Failed to create event. Please try again later.');
      }
    }
  });

  // Formik Setup for UpdateEvent form
  const formikUpdateEvent = useFormik({
    initialValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: ''
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch(`https://art-gallery-imr2.onrender.com/exhibitions/${formikUpdateEvent.values.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({
            name: values.name,
            description: values.description,
            start_date: values.startDate,
            end_date: values.endDate
          })
        });

        if (response.ok) {
          handleUpdateSuccess();
        } else {
          const data = await response.json();
          console.error('Failed to update event:', data.message);
          alert('Failed to update event. Please try again.');
        }
      } catch (error) {
        console.error('Error updating event:', error);
        alert('Failed to update event. Please try again later.');
      }
    }
  });

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const fetchExhibitions = async () => {
    try {
      const response = await fetch('https://art-gallery-imr2.onrender.com/exhibitions');
      if (!response.ok) {
        throw new Error('Failed to fetch exhibitions');
      }
      const data = await response.json();
      setExhibitions(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching exhibitions:', error);
      setError('Error fetching exhibitions. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://art-gallery-imr2.onrender.com/exhibitions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        setExhibitions(exhibitions.filter(exhibition => exhibition.id !== id));
      } else {
        const data = await response.json();
        console.error('Failed to delete exhibition:', data.message);
        alert('Failed to delete exhibition. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting exhibition:', error);
      alert('Error deleting exhibition. Please try again later.');
    }
  };

  const handleCreateSuccess = (newEvent) => {
    setExhibitions([...exhibitions, newEvent]);
  };

  const handleUpdateSuccess = () => {
    fetchExhibitions(); // Refetch exhibitions after successful update
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <PageContainer>
      <Navbar />
      <Header>
        <h1>Exhibitions</h1>
        {isAuthenticated() && userData.role === 'artist' && (
          <div>
            <h2>Create Event</h2>
            <form onSubmit={formikCreateEvent.handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Event Name"
                onChange={formikCreateEvent.handleChange}
                value={formikCreateEvent.values.name}
              />
              <textarea
                name="description"
                placeholder="Event Description"
                onChange={formikCreateEvent.handleChange}
                value={formikCreateEvent.values.description}
              />
              <input
                type="date"
                name="startDate"
                onChange={formikCreateEvent.handleChange}
                value={formikCreateEvent.values.startDate}
              />
              <input
                type="date"
                name="endDate"
                onChange={formikCreateEvent.handleChange}
                value={formikCreateEvent.values.endDate}
              />
              <button type="submit">Create Event</button>
            </form>
          </div>
        )}
      </Header>

      <ExhibitionList>
        {exhibitions.map((exhibition, index) => (
          <ExhibitionCard key={index}>
            <ExhibitionTitle>{exhibition.name}</ExhibitionTitle>
            <ExhibitionDescription>{exhibition.description}</ExhibitionDescription>
            <p>Start Date: {exhibition.start_date}</p>
            <p>End Date: {exhibition.end_date}</p>
            {isAuthenticated() && userData.role === 'artist' && exhibition.artist_id === userData.artist.user_id && (
              <DeleteButton onClick={() => handleDelete(exhibition.id)}>Delete</DeleteButton>
            )}
            {isAuthenticated() && userData.role === 'artist' && exhibition.artist_id === userData.artist.user_id && (
              <UpdateEvent
                eventId={exhibition.id}
                initialValues={{
                  name: exhibition.name,
                  description: exhibition.description,
                  startDate: exhibition.start_date,
                  endDate: exhibition.end_date
                }}
                onSubmit={formikUpdateEvent.handleSubmit}
                onSuccess={handleUpdateSuccess}
              />
            )}
          </ExhibitionCard>
        ))}
      </ExhibitionList>

      <Footer>
        <p>Contact us | About | Terms of Service</p>
        <p>Phone number: +25495785281</p>
        <p>Email : infoatartgalery@gmail.com</p>
      </Footer>
    </PageContainer>
  );
};

export default ExhibitionsPage;
