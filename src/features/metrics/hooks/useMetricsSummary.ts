import { useEffect, useState } from 'react';
import { getMetricsSummary } from '../api/metrics';
import { MetricsSummary } from '../types';

export const useMetricsSummary = () => {
  const [data, setData] = useState<MetricsSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetricsSummary = async () => {
      try {
        const response = await getMetricsSummary();
        console.log('Fetched Metrics Summary:', response);
        setData(response);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetricsSummary();
  }, []);

  return { data, loading, error };
};