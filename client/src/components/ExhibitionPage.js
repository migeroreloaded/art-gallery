import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import CreateEvent from './AddEvent'; // Assuming this is your component for adding exhibitions
import UpdateEvent from './UpdateEvent';
import {
  PageContainer,
  Header,
  ExhibitionList,
  ExhibitionCard,
  ExhibitionTitle,
  ExhibitionDescription,
  Footer,
  DeleteButton // Add DeleteButton
} from './styles';
import { useAuth } from './AuthContext';

const ExhibitionsPage = () => {
  const { isAuthenticated, userData } = useAuth();
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchExhibitions = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5555/exhibitions');
      setExhibitions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching exhibitions. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExhibitions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5555/exhibitions/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setExhibitions(exhibitions.filter(exhibition => exhibition.id !== id));
    } catch (error) {
      console.error('Error deleting exhibition:', error);
      setError('Error deleting exhibition. Please try again later.');
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
          <CreateEvent onSuccess={handleCreateSuccess} />
        )}
      </Header>

      <ExhibitionList>
        {exhibitions.map((exhibition, index) => (
          <ExhibitionCard key={index}>
            <ExhibitionTitle>{exhibition.name}</ExhibitionTitle>
            <ExhibitionDescription>{exhibition.description}</ExhibitionDescription>
            <p>Start Date: {exhibition.start_date}</p>
            <p>End Date: {exhibition.end_date}</p>
            {isAuthenticated() && userData.role === 'artist' && exhibition.artist_id === userData.artist.id && (
              <DeleteButton onClick={() => handleDelete(exhibition.id)}>Delete</DeleteButton>
            )}
            {isAuthenticated() && userData.role === 'artist' && exhibition.artist_id === userData.artist.id && (
              <UpdateEvent eventId={exhibition.id} onSuccess={handleUpdateSuccess} />
            )}
          </ExhibitionCard>
        ))}
      </ExhibitionList>

      <Footer>
        <p>Contact us | About | Terms of Service</p>
      </Footer>
    </PageContainer>
  );
};

export default ExhibitionsPage;
