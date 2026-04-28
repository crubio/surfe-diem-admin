import { useQuery } from '@tanstack/react-query';
import { getHealth, getHealthServices } from '../api/health';

export const useHealth = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: getHealth,
    staleTime: 30000,
    retry: false,
  });
};

export const useHealthServices = () => {
  return useQuery({
    queryKey: ['health/services'],
    queryFn: getHealthServices,
    staleTime: 30000,
    retry: false,
  });
};
