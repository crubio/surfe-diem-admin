import { axios } from '@lib/axios';
import { API_ROUTES } from 'utils/routing';
import { TideStation, TideStationsResponse, CreateTideStationRequest, UpdateTideStationRequest } from '@features/tides/types';

export const getTideStations = (limit: number = 1000): Promise<TideStationsResponse> => {
  return axios.get(`${API_ROUTES.TIDE_STATIONS}?limit=${limit}`);
}

export const getTideStation = (id: string): Promise<TideStation> => {
  return axios.get(`${API_ROUTES.TIDE_STATIONS}/${id}`);
}

export const createTideStation = (params: CreateTideStationRequest): Promise<TideStation> => {
  return axios.post(API_ROUTES.TIDE_STATIONS, params);
}

export const updateTideStation = (id: string, params: UpdateTideStationRequest): Promise<TideStation> => {
  return axios.put(`${API_ROUTES.TIDE_STATIONS}/${id}`, params);
}

export const deleteTideStation = (id: string): Promise<void> => {
  return axios.delete(`${API_ROUTES.TIDE_STATIONS}/${id}`);
} 