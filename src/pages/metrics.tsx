import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Alert, Card, Form, Row, Col, Button } from 'react-bootstrap';
import { getMetricsSummary, getUpstreamMetrics } from '@features/metrics/api/metrics';
import { TrafficSpikeChart } from '@features/metrics/components/TrafficSpikeChart';
import { ErrorRateChart } from '@features/metrics/components/ErrorRateChart';
import { SlowestEndpointsTable } from '@features/metrics/components/SlowestEndpointsTable';
import { UpstreamMetricsTable } from '@features/metrics/components/UpstreamMetricsTable';
import { MetricsSummary } from '@features/metrics/types';
import { Loading } from '@features/ui/loading';

const CLIENT_OPTIONS = ['', 'ndbc', 'nws', 'noaa_tides'];

function MetricsPage() {
  const [hours, setHours] = useState(24);
  const [client, setClient] = useState('');
  const [upstreamParams, setUpstreamParams] = useState<{ hours: number; client: string }>({ hours: 24, client: '' });

  const { data, isLoading, isError } = useQuery<MetricsSummary>({
    queryKey: ['metrics'],
    queryFn: getMetricsSummary,
  });

  const {
    data: upstreamData,
    isLoading: upstreamLoading,
    isError: upstreamError,
  } = useQuery<Record<string, unknown>>({
    queryKey: ['metrics-upstream', upstreamParams],
    queryFn: () =>
      getUpstreamMetrics({
        hours: upstreamParams.hours,
        ...(upstreamParams.client ? { client: upstreamParams.client } : {}),
      }),
  });

  const handleUpstreamFilter = () => {
    setUpstreamParams({ hours, client });
  };

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

      <h2 className="mt-5 mb-3">Upstream Metrics</h2>

      <Card className="mb-4">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col xs="auto">
              <Form.Label>Hours</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={720}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                style={{ width: '100px' }}
              />
            </Col>
            <Col xs="auto">
              <Form.Label>Client</Form.Label>
              <Form.Select value={client} onChange={(e) => setClient(e.target.value)} style={{ width: '160px' }}>
                {CLIENT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt || 'All'}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col xs="auto">
              <Button onClick={handleUpstreamFilter}>Apply</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {upstreamLoading && <Loading text="Loading upstream metrics..." />}

      {upstreamError && (
        <Alert variant="danger">
          <Alert.Heading>Error Loading Upstream Metrics</Alert.Heading>
          <p>There was an error loading upstream metrics. Please try again.</p>
        </Alert>
      )}

      {!upstreamLoading && !upstreamError && upstreamData && (
        <Card>
          <Card.Body>
            <UpstreamMetricsTable data={upstreamData} />
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default MetricsPage;
