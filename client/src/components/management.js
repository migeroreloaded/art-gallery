// ManagementPage.js
import React from 'react';
import AddArtwork from './AddArtwork';
import AddEvent from './AddEvent'
import DeleteArtist from './DeleteArtist'
import DeleteArtwork from './DeleteArtwork'
import DeleteEvent from './DeleteEvent'
import UpdateArtwork from './UpdateArtwork'
import UpdateEvent from './UpdateEvent'

const ManagementPage = () => {
  return (
    <div>
      <h1>Management Page</h1>
      <AddArtwork />
      <AddEvent />
      <DeleteArtist />
      <DeleteArtwork />
      <DeleteEvent />
      <UpdateArtwork />
      <UpdateEvent />
      {/* Add other management components as needed */}
    </div>
  );
};

export default ManagementPage;
