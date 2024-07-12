import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PageContainer,
  Header,
  ExhibitionList,
  ExhibitionCard,
  ExhibitionTitle,
  ExhibitionDescription,
  Footer
} from './styles'; // Ensure this path is correct

const ExhibitionsPage = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <PageContainer>
      <Header>
        <h1>Exhibitions</h1>
      </Header>

      <ExhibitionList>
        {exhibitions.map((exhibition, index) => (
          <ExhibitionCard key={index}>
            <ExhibitionTitle>{exhibition.name}</ExhibitionTitle>
            <ExhibitionDescription>{exhibition.description}</ExhibitionDescription>
            <p>Start Date: {exhibition.start_date}</p>
            <p>End Date: {exhibition.end_date}</p>
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
