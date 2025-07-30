import Axios, { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_V1_URL } from '../config';
import { UseLocalStorage, PREFIX } from '../utils/storage';

const authRequestInterceptor = (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers = config.headers ?? {};
  const { getItem } = UseLocalStorage();

  const token = getItem(`${PREFIX}token`);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  
  // Log request in development
  if (import.meta.env.DEV) {
    console.log('API Request:', {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      hasToken: !!token,
      headers: config.headers,
      data: config.data
    });
  }
  
  return config as InternalAxiosRequestConfig;
}

export const axios = Axios.create({
  baseURL: API_V1_URL,
  timeout: 10000,
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful response in development
    if (import.meta.env.DEV) {
      console.log('API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data
      });
    }
    return response.data;
  },
  (error) => {
    // Log error in development
    if (import.meta.env.DEV) {
      console.error('API Error:', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data,
        headers: error.config?.headers,
        requestData: error.config?.data
      });
    }
    
    // Handle common error cases
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem(`${PREFIX}token`);
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      // Forbidden
      console.error('Access forbidden');
    } else if (error.response?.status >= 500) {
      // Server error
      console.error('Server error:', error.response?.data);
      
      // If it's the users/me endpoint with a 500 error, clear the token
      // as the server might be having issues with authentication
      if (error.config?.url?.includes('/users/me')) {
        console.error('Server error on /users/me endpoint, clearing token');
        localStorage.removeItem(`${PREFIX}token`);
      }
    }
    
    return Promise.reject(error);
  }
);