import { axios } from '@lib/axios';
import { API_BASE_URL } from 'config';
import { API_ROUTES } from 'utils/routing';
import { CacheStatus, CacheClearResponse } from '../types';

export const getCacheStatus = (): Promise<CacheStatus> => {
  return axios.get(`${API_BASE_URL}${API_ROUTES.CACHE_STATUS}`);
};

export const clearCache = (cacheName?: string): Promise<CacheClearResponse> => {
  const params = cacheName ? { cache_name: cacheName } : undefined;
  return axios.post(`${API_BASE_URL}${API_ROUTES.CACHE_CLEAR}`, null, { params });
};
