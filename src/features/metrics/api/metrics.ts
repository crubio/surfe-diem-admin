import { axios } from '@lib/axios';
import { API_ROUTES } from 'utils/routing';
import { MetricsSummary } from '../types';

export const getMetricsSummary = (): Promise<MetricsSummary> => {
  return axios.get(API_ROUTES.METRICS);
};