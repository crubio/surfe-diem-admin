import { useQuery } from '@tanstack/react-query';
import { Alert, Card } from 'react-bootstrap';
import { getMetricsSummary } from '@features/metrics/api/metrics';
import { TrafficSpikeChart } from '@features/metrics/components/TrafficSpikeChart';
import { ErrorRateChart } from '@features/metrics/components/ErrorRateChart';
import { SlowestEndpointsTable } from '@features/metrics/components/SlowestEndpointsTable';
import { MetricsSummary } from '@features/metrics/types';
import { Loading } from '@features/ui/loading';

function MetricsPage() {
  const { data, isLoading, isError } = useQuery<MetricsSummary>({
    queryKey: ['metrics'],
    queryFn: getMetricsSummary,
  });

  const metricsData = data || [];

  return (
    <div className="py-4">
      <h1 className="mb-4">System Health & Metrics</h1>

      {isLoading && <Loading text="Loading metrics..." />}

      {isError && (
        <Alert variant="danger">
          <Alert.Heading>Error Loading Metrics</Alert.Heading>
          <p>There was an error loading the metrics. Please try refreshing the page.</p>
        </Alert>
      )}

      {!isLoading && !isError && data && (
        <div className="d-flex flex-column gap-4">
          <Card>
            <Card.Body>
              <TrafficSpikeChart data={data.top_paths} />
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <ErrorRateChart data={data.by_status_code} />
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <SlowestEndpointsTable data={data.top_paths} />
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}

export default MetricsPage;