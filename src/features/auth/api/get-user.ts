import { axios } from '@lib/axios';
import { AuthUser } from '../types';

const GET_USER_ME_URL = '/users/me';

export const getUser = (): Promise<AuthUser> => {
  return axios.get(GET_USER_ME_URL);
};