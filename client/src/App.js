import React from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Navbar from './components/Navbar';
import Artwork from './components/Artworks';

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
    </>
  );
}

export default App;