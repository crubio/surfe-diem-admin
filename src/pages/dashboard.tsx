// src/pages/dashboard.tsx
import React from "react";
import { Card, Badge, Spinner, Alert, Button } from "react-bootstrap";
import { useSiteMetrics } from "hooks/use-site-metrics";
import { useHealth, useHealthServices } from "@features/health";

function statusVariant(status: string): string {
  switch (status?.toLowerCase()) {
    case "ok":
    case "healthy":
      return "success";
    case "degraded":
      return "warning";
    default:
      return "danger";
  }
}

export default function Dashboard() {
  const { data, isLoading, isError } = useSiteMetrics();
  const health = useHealth();
  const healthServices = useHealthServices();

  if (isLoading) {
    return (
      <div className="py-3 text-center">
        <Spinner animation="border" /> Loading site metrics...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <Alert variant="danger" className="py-3">
        Error loading site content metrics.
      </Alert>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 py-4">
        <h2 className="mb-0">Dashboard</h2>
        <Button variant="outline-primary" onClick={() => { /* Refresh logic here */ }}>
          Refresh Metrics
        </Button>
      </div>

      {/* API Liveness */}
      <div className="d-flex align-items-center gap-2 mb-4">
        <small className="text-muted">API Status:</small>
        {health.isLoading ? (
          <Spinner animation="border" size="sm" />
        ) : health.isError || !health.data ? (
          <Badge bg="danger">Unreachable</Badge>
        ) : (
          <Badge bg={statusVariant(health.data.status)}>{health.data.status.toUpperCase()}</Badge>
        )}
      </div>

      {/* Overview Cards */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        <Card className="flex-fill text-dark bg-primary-subtle">
          <Card.Body>
            <Card.Title>
              <i className="bi bi-geo-alt-fill me-2"></i> Total Spots
            </Card.Title>
            <h3>{data.spotCount}</h3>
            <small className="text-dark">Includes all published and draft spots</small>
          </Card.Body>
        </Card>

        <Card className="flex-fill text-dark bg-info-subtle">
          <Card.Body>
            <Card.Title>
              <i className="bi bi-water me-2"></i> Total Buoys
            </Card.Title>
            <h3>{data.buoyCount}</h3>
            <small className="text-dark">Active monitoring buoys</small>
          </Card.Body>
        </Card>

        <Card className="flex-fill text-dark bg-light">
          <Card.Body>
            <Card.Title>
              <i className="bi bi-wave me-2"></i> Total Tide Stations
            </Card.Title>
            <h3>{data.tideStationCount}</h3>
            <small className="text-muted">Tide data sources integrated</small>
          </Card.Body>
        </Card>
      </div>

      {/* Service Health */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        <Card className="flex-fill">
          <Card.Body>
            <Card.Title>
              <i className="bi bi-hdd-network me-2"></i> Service Health
            </Card.Title>
            {healthServices.isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : healthServices.isError || !healthServices.data ? (
              <Badge bg="danger">Unavailable</Badge>
            ) : (
              <>
                <Badge bg={statusVariant(healthServices.data.status)} className="mb-3">
                  {healthServices.data.status.toUpperCase()}
                </Badge>
                <div className="d-flex flex-column gap-1">
                  {Object.entries(healthServices.data.services).map(([name, status]) => (
                    <div key={name} className="d-flex justify-content-between align-items-center">
                      <span className="text-capitalize">{name}</span>
                      <Badge bg={statusVariant(status)}>{status.toUpperCase()}</Badge>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
