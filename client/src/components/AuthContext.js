// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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
  }, []);

  // Function to log in user
  const login = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5555/login', formData);
      if (response.data.message === 'Login successful') {
        const token = response.data.token;
        const user = response.data.user; // Assuming your backend sends back user data

        setAuthToken(token);
        setUserData(user);

        // Store token and user data in localStorage for persistence
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(user));

        return { success: true, role: user.role };
      } else {
        return { success: false, message: response.data.message || 'Login failed' };
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
