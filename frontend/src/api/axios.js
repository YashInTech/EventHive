import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Automatically include the token if it exists
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    } else {
        console.warn('No token found in localStorage');
    }
    console.log('Request URL:', config.baseURL + config.url);
    console.log('Token sent:', token); // Log token being sent
    return config;
});

export default apiClient;