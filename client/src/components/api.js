// src/utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5555';  // Replace with your actual backend URL

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,  // Adjust timeout as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
