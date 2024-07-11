import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      setUser(response.data.user);
    } catch (error) {
      throw new Error(error.response.data.message || 'Login failed');
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/register', { username, email, password });
      setUser(response.data.user);
    } catch (error) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);