import { axios } from '@lib/axios';
import { API_ROUTES } from 'utils/routing';
import { MetricsSummary } from '../types';

export const getMetricsSummary = (): Promise<MetricsSummary> => {
  return axios.get(API_ROUTES.METRICS);
};

export interface UpstreamMetricsParams {
  hours?: number;
  client?: string;
}

export const getUpstreamMetrics = (params: UpstreamMetricsParams = {}): Promise<Record<string, unknown>> => {
  return axios.get(API_ROUTES.METRICS_UPSTREAM, { params });
};