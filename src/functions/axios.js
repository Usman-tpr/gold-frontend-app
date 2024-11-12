import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import URL from './URLString';
// import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: URL,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');

      // Check if the user is already on the home route
      if (window.location.pathname !== '/') {
        // Redirect to login page only if the current route is not '/'
        window.location.href = '/';
      }

      // Optionally, show a toast notification
      // toast.info("Session timeout");
    }
    return Promise.reject(error);
  }
);

export default instance;