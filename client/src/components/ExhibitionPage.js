import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  // Wrapper,
  PageContainer,
  Header,
  ExhibitionList,
  ExhibitionCard,
  ExhibitionTitle,
  ExhibitionDescription,
  Footer,
  Form,
  FormField,
  Button
} from './styles'; // Ensure this path is correct

const ExhibitionsPage = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: ''
  });
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5555/events');
        setExhibitions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching exhibitions. Please try again later.');
        setLoading(false);
      }
    };

    fetchExhibitions();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5555/events', newEvent);
      setExhibitions([...exhibitions, response.data]);
      setNewEvent({
        name: '',
        description: '',
        start_date: '',
        end_date: ''
      });
      alert('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Error creating event. Please try again later.');
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:5555/events/${editingEvent.id}`, editingEvent);
      setExhibitions(exhibitions.map(event => (event.id === editingEvent.id ? response.data : event)));
      setEditingEvent(null);
      alert('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Error updating event. Please try again later.');
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/events/${eventId}`);
      setExhibitions(exhibitions.filter(event => event.id !== eventId));
      alert('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        [name]: value
      });
    } else {
      setNewEvent({
        ...newEvent,
        [name]: value
      });
    }
  };

  const startEditing = (event) => {
    setEditingEvent(event);
  };

  const cancelEditing = () => {
    setEditingEvent(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    // <Wrapper>
      <PageContainer>
        <Header>
          <h1>Exhibitions</h1>
        </Header>

        <Form onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}>
          <h2>{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
          <FormField>
            <label>Event Name</label>
            <input
              type="text"
              name="name"
              value={editingEvent ? editingEvent.name : newEvent.name}
              onChange={handleInputChange}
              placeholder="Event Name"
              required
            />
          </FormField>
          <FormField>
            <label>Event Description</label>
            <textarea
              name="description"
              value={editingEvent ? editingEvent.description : newEvent.description}
              onChange={handleInputChange}
              placeholder="Event Description"
              required
            />
          </FormField>
          <FormField>
            <label>Start Date</label>
            <input
              type="date"
              name="start_date"
              value={editingEvent ? editingEvent.start_date : newEvent.start_date}
              onChange={handleInputChange}
              required
            />
          </FormField>
          <FormField>
            <label>End Date</label>
            <input
              type="date"
              name="end_date"
              value={editingEvent ? editingEvent.end_date : newEvent.end_date}
              onChange={handleInputChange}
              required
            />
          </FormField>
          <Button type="submit">{editingEvent ? 'Update Event' : 'Create Event'}</Button>
          {editingEvent && <Button type="button" onClick={cancelEditing}>Cancel</Button>}
        </Form>

        <ExhibitionList>
          {exhibitions.map((exhibition, index) => (
            <ExhibitionCard key={index}>
              <ExhibitionTitle>{exhibition.name}</ExhibitionTitle>
              <ExhibitionDescription>{exhibition.description}</ExhibitionDescription>
              <p>Start Date: {exhibition.start_date}</p>
              <p>End Date: {exhibition.end_date}</p>
              <Button onClick={() => startEditing(exhibition)}>Edit</Button>
              <Button onClick={() => handleDeleteEvent(exhibition.id)}>Delete</Button>
            </ExhibitionCard>
          ))}
        </ExhibitionList>

        <Footer>
          <p>Contact us | About | Terms of Service</p>
        </Footer>
      </PageContainer>
    // </Wrapper>
  );
};

export default ExhibitionsPage;
