import React from 'react';
import {
  PageContainer,
  Header,
  ExhibitionHighlights,
  ExhibitionList,
  ExhibitionCard,
  ExhibitionTitle,
  ExhibitionDescription,
  Footer
} from './styles'; // Ensure this path is correct

const exhibitions = [
  {
    title: "Impressionist Masters",
    description: "An exhibition of works by Monet, Degas, and other Impressionist painters.",
    imageUrl: "/images/impressionist.jpg"
  },
  {
    title: "Modern Art",
    description: "Explore the abstract and avant-garde works of the 20th century.",
    imageUrl: "/images/modern.jpg"
  },
  // Add more exhibitions as needed
];

const ExhibitionsPage = () => {
  return (
    <PageContainer>
      <Header>
        <h1>Exhibitions</h1>
      </Header>

      <ExhibitionHighlights>
        <h2>Current Highlights</h2>
        {exhibitions.slice(0, 2).map((exhibition, index) => (
          <ExhibitionCard key={index}>
            <img src={exhibition.imageUrl} alt={exhibition.title} />
            <ExhibitionTitle>{exhibition.title}</ExhibitionTitle>
            <ExhibitionDescription>{exhibition.description}</ExhibitionDescription>
          </ExhibitionCard>
        ))}
      </ExhibitionHighlights>

      <ExhibitionList>
        {exhibitions.map((exhibition, index) => (
          <ExhibitionCard key={index}>
            <img src={exhibition.imageUrl} alt={exhibition.title} />
            <ExhibitionTitle>{exhibition.title}</ExhibitionTitle>
            <ExhibitionDescription>{exhibition.description}</ExhibitionDescription>
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
