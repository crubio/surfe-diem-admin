import Axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from '../config';
import {UseLocalStorage, PREFIX} from '../utils/storage';

const authRequestInterceptor = (config: AxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers = config.headers ?? {};
  const {getItem} = UseLocalStorage();

  const token = getItem(`${PREFIX}token`);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config as InternalAxiosRequestConfig;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // TODO: handle error with some notification store
    // const message = error.response?.data?.message || error.message;
    return Promise.reject(error);
  }
);