import React from 'react';
import AddArtwork from './AddArtwork';
import AddEvent from './AddEvent';
import UpdateArtwork from './UpdateArtwork';
import UpdateEvent from './UpdateEvent';
import styled from 'styled-components';
import Navbar from './Navbar';

const ManagementContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
`;

const ManagementPage = () => {
  return (
    <div>
      <h1>Art Management</h1>
      <Navbar />
      <ManagementContainer>
        <AddArtwork />
        <AddEvent />
        <UpdateArtwork />
        <UpdateEvent />
      </ManagementContainer>
    </div>
  );
};

export default ManagementPage;
