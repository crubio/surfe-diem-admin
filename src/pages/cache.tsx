import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, Button, Alert, Badge, Modal, Spinner, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getCacheStatus, clearCache } from '@features/cache';
import { ErrorBoundary } from '@features/ui';

function formatTtl(seconds: number): string {
  if (seconds <= 0) return 'Expired';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

const CachePage: React.FC = () => {
  const [confirmTarget, setConfirmTarget] = useState<string | 'all' | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['cache/status'],
    queryFn: getCacheStatus,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const clearMutation = useMutation({
    mutationFn: (cacheName?: string) => clearCache(cacheName),
    onSuccess: (result) => {
      const cleared = Array.isArray(result.cleared)
        ? result.cleared.join(', ')
        : result.cleared;
      toast.success(`Cleared: ${cleared}`);
      queryClient.invalidateQueries({ queryKey: ['cache/status'] });
      setConfirmTarget(null);
    },
    onError: () => {
      toast.error('Failed to clear cache');
      setConfirmTarget(null);
    },
  });

  const handleConfirmClear = () => {
    if (confirmTarget === 'all') {
      clearMutation.mutate(undefined);
    } else if (confirmTarget) {
      clearMutation.mutate(confirmTarget);
    }
  };

  if (isLoading) {
    return (
      <div className="py-3 text-center">
        <Spinner animation="border" /> Loading cache status...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <Alert variant="danger">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Failed to load cache status.
      </Alert>
    );
  }

  const cacheNames = Object.keys(data);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 py-4">
        <div>
          <h2 className="mb-0">Cache</h2>
          <small className="text-muted">{cacheNames.length} cache instances</small>
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="outline-secondary"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => setConfirmTarget('all')}
            disabled={clearMutation.isPending}
          >
            <i className="bi bi-trash me-1"></i>
            Clear All
          </Button>
        </div>
      </div>

      <div className="d-flex flex-column gap-3">
        {cacheNames.map((name) => {
          const cache = data[name];
          return (
            <Card key={name}>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <span className="fw-semibold text-capitalize">{name.replace(/_/g, ' ')}</span>
                  <Badge bg={cache.keys > 0 ? 'primary' : 'secondary'}>
                    {cache.keys} {cache.keys === 1 ? 'key' : 'keys'}
                  </Badge>
                </div>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => setConfirmTarget(name)}
                  disabled={clearMutation.isPending || cache.keys === 0}
                >
                  Clear
                </Button>
              </Card.Header>

              {cache.keys > 0 && (
                <Card.Body className="p-0">
                  <Table className="mb-0" size="sm" hover>
                    <thead className="table-light">
                      <tr>
                        <th className="ps-3">Entry</th>
                        <th className="text-end pe-3" style={{ width: '100px' }}>TTL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cache.entries.map((entry) => (
                        <tr key={entry}>
                          <td className="ps-3 font-monospace small">{entry}</td>
                          <td className="text-end pe-3">
                            <Badge bg="light" text="dark">
                              {formatTtl(cache.ttls_remaining_seconds[entry] ?? 0)}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              )}
            </Card>
          );
        })}
      </div>

      <Modal show={confirmTarget !== null} onHide={() => setConfirmTarget(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Clear</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmTarget === 'all' ? (
            <p>Clear <strong>all {cacheNames.length} cache instances</strong>? This cannot be undone.</p>
          ) : (
            <p>Clear the <strong>{confirmTarget?.replace(/_/g, ' ')}</strong> cache? This cannot be undone.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setConfirmTarget(null)} disabled={clearMutation.isPending}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmClear} disabled={clearMutation.isPending}>
            {clearMutation.isPending ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Clearing...
              </>
            ) : (
              'Clear'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const CachePageWithErrorBoundary: React.FC = () => (
  <ErrorBoundary>
    <CachePage />
  </ErrorBoundary>
);

export default CachePageWithErrorBoundary;
