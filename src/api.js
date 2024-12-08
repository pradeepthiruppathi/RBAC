import axios from 'axios';

// Base URL for the mock API
const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export default api;
