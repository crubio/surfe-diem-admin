import { axios } from '@lib/axios';
import { API_ROUTES } from 'utils/routing'
import { Summary } from '../types';

export const getSummaries = (): Promise<Summary[]> => {
  return axios.get(API_ROUTES.SUMMARIES);
}