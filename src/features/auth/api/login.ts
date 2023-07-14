import { axios } from '@lib/axios';

import { LoginResponse } from '../types';

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<LoginResponse> => {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);
  return axios.post('/login', formData);
};