import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';


const WelcomePage = () => {
  const history = useHistory();

  const handleNavigateToLogin = () => {
    history.push('/login');
  };

  const handleNavigateToSignUp = () => {
    history.push('/register');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1>Welcome to Art Gallery</h1>
        <div className="button-container">
          <button className="welcome-button" onClick={handleNavigateToLogin}>Login</button>
          <button className="welcome-button" onClick={handleNavigateToSignUp}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
