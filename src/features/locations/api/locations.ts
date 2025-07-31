import { axios } from '@lib/axios';
import { API_ROUTES } from 'utils/routing'
import { Location, CreateLocationRequest } from '@features/locations/types';

export const getLocations = (): Promise<Location[]> => {
  return axios.get(API_ROUTES.LOCATIONS);
} 

export const getLocation = (id: string): Promise<Location> => {
  return axios.get(`${API_ROUTES.LOCATIONS}/${id}`);
}

export const createLocation = (params: CreateLocationRequest): Promise<Location> => {
  return axios.post(API_ROUTES.LOCATIONS, params);
}

export const updateLocation = (id: string, params: Location): Promise<Location> => {
  return axios.put(`${API_ROUTES.LOCATIONS}/${id}`, params);
}