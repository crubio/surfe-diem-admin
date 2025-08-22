// src/pages/dashboard.tsx
import React from "react";
import { Card, Table, Badge, Spinner, Alert, Button } from "react-bootstrap";
import { useSiteMetrics } from "hooks/use-site-metrics";

export default function Dashboard() {
  const { data, isLoading, isError } = useSiteMetrics();
  const statusBreakdown = []

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Dashboard</h2>
        <Button variant="outline-primary" onClick={() => { /* Refresh logic here */ }}>
          Refresh Metrics
        </Button>
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

      {/* Status Breakdown */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Spot Status Breakdown</Card.Title>
          <div className="d-flex gap-2 flex-wrap mt-2">
            <Badge pill key={status} bg={"info"} className="px-3 py-2">
              {"Data not available"}
            </Badge>
          </div>
        </Card.Body>
      </Card>
      {/* Future Section: Trends, Activity */}
      {/* Placeholder for charts or additional metrics */}
    </div>
  );
}