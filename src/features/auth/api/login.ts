import { axios } from '@lib/axios';
import { LoginResponse } from '../types';

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export const loginWithEmailAndPassword = async (data: LoginCredentialsDTO): Promise<LoginResponse> => {
  // OAuth2PasswordRequestForm expects form data with username and password
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('password', data.password);
  
  // OAuth2 endpoints typically don't need explicit Content-Type header
  // Let the browser set it automatically for FormData
  return await axios.post('/login', formData);
};