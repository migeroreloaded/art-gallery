import React from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Navbar from './components/Navbar';
import Artwork from './components/Artworks';
import ExhibitionsPage from './components/ExhibitionPage';
function App() {
  const [signIn, toggle] = React.useState(true);

  return (
    <>
      <Navbar />
      {signIn ? (
        <LoginPage signIn={signIn} toggle={toggle} />
      ) : (
        <RegisterPage signIn={signIn} toggle={toggle} />
      )}
      <Artwork />
      <ExhibitionsPage />
    </>
  );
}

export default App;