import React from 'react';
import { Table, Badge, Button, Stack } from 'react-bootstrap';
import { TideStation } from '@features/tides/types';

interface TideStationsListProps {
  stations: TideStation[];
  onEdit: (station: TideStation) => void;
  onDelete: (station: TideStation) => void;
  isLoading?: boolean;
}

export const TideStationsList: React.FC<TideStationsListProps> = ({
  stations,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading tide stations...</p>
      </div>
    );
  }

  if (stations.length === 0) {
    return (
      <div className="text-center py-4">
        <i className="bi bi-water fs-1 text-muted"></i>
        <p className="mt-2 text-muted">No tide stations found</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <Table striped hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Station ID</th>
            <th>Station Name</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((station) => (
            <tr key={station.id}>
              <td>
                <Badge bg="primary" className="font-monospace">
                  {station.station_id}
                </Badge>
              </td>
              <td>
                <strong>{station.station_name}</strong>
              </td>
              <td className="font-monospace">{station.latitude}</td>
              <td className="font-monospace">{station.longitude}</td>
              <td>
                <Stack direction="horizontal" gap={2}>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onEdit(station)}
                  >
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(station)}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Delete
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}; 