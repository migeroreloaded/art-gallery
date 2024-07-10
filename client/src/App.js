import React from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  const [signIn, toggle] = React.useState(true);

  return (
    <>
      {signIn ? (
        <LoginPage signIn={signIn} toggle={toggle} />
      ) : (
        <RegisterPage signIn={signIn} toggle={toggle} />
      )}
    </>
  );
}

export default App;
