import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null); // State to hold authentication token
  const [userData, setUserData] = useState(null); // State to hold user data

  useEffect(() => {
    // Check if there's an authToken and userData in localStorage on component mount
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('userData'));
    if (token && user) {
      setAuthToken(token);
      setUserData(user);
    }
    console.log('Auth Token in useEffect:', authToken); // Log authToken in useEffect
  }, []);

  // Function to log in user
  const login = async (formData) => {
    try {
      const response = await fetch('http://localhost:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.message === 'Login successful') {
        const token = data.access_token;
        const user = data.user; // Assuming your backend sends back user data

        setAuthToken(token);
        setUserData(user);

        // Store token and user data in localStorage for persistence
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(user));

        console.log('Auth Token after login:', authToken); // Log authToken after setting in state

        return { success: true, role: user.role };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, message: 'Invalid credentials' };
    }
  };

  // Function to log out user
  const logout = () => {
    setAuthToken(null);
    setUserData(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    return authToken !== null;
  };

  return (
    <AuthContext.Provider value={{ authToken, userData, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);
