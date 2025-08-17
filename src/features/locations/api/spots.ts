import { axios } from '@lib/axios';
import { API_ROUTES } from 'utils/routing'
import { Spot } from '@features/locations/types';

export const getSpots = (): Promise<Spot[]> => {
  return axios.get(API_ROUTES.SPOTS, {
    params: {
      limit: 5000
    }
  });
} 
