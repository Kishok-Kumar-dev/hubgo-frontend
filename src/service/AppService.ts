
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken'); // Get the token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach JWT token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const getData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async <T>(
  endpoint: string,
  data: any
): Promise<T> => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const loginUser = async (credentials:any) => {
  try {
    const response = await apiClient.post('/auth/signin', credentials);
    const { jwtToken } = response.data; 
    localStorage.setItem('jwtToken', jwtToken);
    return response.data; 
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('jwtToken'); 
};

