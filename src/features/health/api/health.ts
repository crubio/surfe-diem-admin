import { axios } from '@lib/axios';
import { API_BASE_URL } from 'config';
import { API_ROUTES } from 'utils/routing';
import { HealthStatus, HealthServicesStatus } from '../types';

export const getHealth = (): Promise<HealthStatus> => {
  return axios.get(`${API_BASE_URL}${API_ROUTES.HEALTH}`);
};

export const getHealthServices = (): Promise<HealthServicesStatus> => {
  return axios.get(`${API_BASE_URL}${API_ROUTES.HEALTH_SERVICES}`);
};
