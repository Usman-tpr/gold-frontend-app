import axios from 'axios';

// Create an instance of axios with default headers and baseURL
// const api = axios.create({
//   baseURL: 'http://localhost:8002', 
// });
import URL from '../functions/URLString';
const api = axios.create({
  baseURL: URL
});

// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('Gold_token');
};


// Set up request interceptor to add authorization token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// GET request
export const getRequest = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};

// POST request
export const postRequest = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('POST request error:', error);
    throw error;
  }
};

// PUT request
export const putRequest = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('PUT request error:', error);
    throw error;
  }
};

// DELETE request
export const deleteRequest = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('DELETE request error:', error);
    throw error;
  }
};
