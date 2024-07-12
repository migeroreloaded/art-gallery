import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5555/user');
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5555/login', { email, password });
      setUser(response.data.user);
    } catch (error) {
      throw new Error(error.response.data.message || 'Login failed');
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5555/register', { username, email, password });
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