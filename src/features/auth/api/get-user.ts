import { axios } from '@lib/axios';
import { AuthUser } from '../types';

const GET_USER_ME_URL = '/api/v1/users/me';

export const getUser = (): Promise<AuthUser> => {
  return axios.get(GET_USER_ME_URL);
};