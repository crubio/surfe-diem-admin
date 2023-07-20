import Axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from '../config';
import {useLocalStorage, PREFIX} from '../utils/storage';

const authRequestInterceptor = (config: AxiosRequestConfig): any => {
  config.headers = config.headers ?? {};
  const {getItem} = useLocalStorage();

  const token = getItem(`${PREFIX}token`);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
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