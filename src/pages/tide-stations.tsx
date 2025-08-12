import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, Button, Alert, Modal, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { 
  getTideStations, 
  createTideStation, 
  updateTideStation, 
  deleteTideStation 
} from '@features/tides';
import { TideStation, CreateTideStationRequest, UpdateTideStationRequest } from '@features/tides/types';
import { TideStationsList } from '@features/tides/components/tide-stations-list';
import { TideStationForm } from '@features/tides/components/tide-station-form';
import { TideStationsFilter } from '@features/tides/components/tide-stations-filter';
import { filterTideStationsByName } from '@features/tides/utils/filter-tide-stations';
import { Loading, ErrorBoundary } from '@features/ui';

const TideStationsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingStation, setEditingStation] = useState<TideStation | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [stationToDelete, setStationToDelete] = useState<TideStation | null>(null);

  const queryClient = useQueryClient();

  // Fetch tide stations
  const {
    data: tideStationsResponse,
    isLoading,
    error
  } = useQuery({
    queryKey: ['tideStations'],
    queryFn: () => getTideStations(1000),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Memoize stations array
  const stations = useMemo(() => tideStationsResponse?.stations || [], [tideStationsResponse]);

  // Memoize filtered stations
  const filteredStations = useMemo(() => 
    filterTideStationsByName(stations, searchTerm),
    [stations, searchTerm]
  );

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateTideStationRequest) => createTideStation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tideStations'] });
      toast.success('Tide station created successfully!');
      setShowForm(false);
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create tide station';
      toast.error(errorMessage);
    }
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTideStationRequest }) => 
      updateTideStation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tideStations'] });
      toast.success('Tide station updated successfully!');
      setShowForm(false);
      setEditingStation(null);
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update tide station';
      toast.error(errorMessage);
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTideStation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tideStations'] });
      toast.success('Tide station deleted successfully!');
      setShowDeleteModal(false);
      setStationToDelete(null);
    },
    onError: (error: unknown) => {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete tide station';
      toast.error(errorMessage);
    }
  });

  const handleCreate = () => {
    setEditingStation(null);
    setShowForm(true);
  };

  const handleEdit = (station: TideStation) => {
    setEditingStation(station);
    setShowForm(true);
  };

  const handleDelete = (station: TideStation) => {
    setStationToDelete(station);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (stationToDelete) {
      deleteMutation.mutate(stationToDelete.station_id.toString());
    }
  };

  const handleFormSubmit = async (data: CreateTideStationRequest | UpdateTideStationRequest) => {
    if (editingStation) {
      await updateMutation.mutateAsync({ id: editingStation.id.toString(), data });
    } else {
      await createMutation.mutateAsync(data as CreateTideStationRequest);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingStation(null);
  };

  if (isLoading) {
    return <Loading text="Loading tide stations..." />;
  }

  if (error) {
    return (
      <Alert variant="danger">
        <i className="bi bi-exclamation-triangle me-2"></i>
        Failed to load tide stations: {error instanceof Error ? error.message : 'Unknown error'}
      </Alert>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0">
                    <i className="bi bi-water me-2"></i>
                    Tide Stations
                  </h4>
                  <p className="text-muted mb-0">
                    Manage tide monitoring stations
                  </p>
                </div>
                <Button
                  variant="primary"
                  onClick={handleCreate}
                  disabled={createMutation.isPending}
                >
                  <i className="bi bi-plus-circle me-1"></i>
                  Add Station
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <TideStationsFilter
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                totalCount={stations.length}
                filteredCount={filteredStations.length}
              />

              <TideStationsList
                stations={filteredStations}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isLoading={isLoading}
              />
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Create/Edit Form Modal */}
      <Modal
        show={showForm}
        onHide={handleFormCancel}
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingStation ? 'Edit Tide Station' : 'Create New Tide Station'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TideStationForm
            station={editingStation}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
            isLoading={createMutation.isPending || updateMutation.isPending}
            error={createMutation.error instanceof Error ? createMutation.error.message : updateMutation.error instanceof Error ? updateMutation.error.message : null}
          />
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this tide station?</p>
          {stationToDelete && (
            <div className="p-3 bg-light rounded">
              <strong>{stationToDelete.station_name}</strong>
              <br />
              <Badge bg="primary" className="me-2">
                {stationToDelete.station_id}
              </Badge>
              <small className="text-muted">
                {stationToDelete.latitude}, {stationToDelete.longitude}
              </small>
            </div>
          )}
          <p className="text-danger mt-2">
            <i className="bi bi-exclamation-triangle me-1"></i>
            This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setShowDeleteModal(false)}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Deleting...
              </>
            ) : (
              <>
                <i className="bi bi-trash me-1"></i>
                Delete Station
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// Wrap with ErrorBoundary
const TideStationsPageWithErrorBoundary: React.FC = () => (
  <ErrorBoundary>
    <TideStationsPage />
  </ErrorBoundary>
);

export default TideStationsPageWithErrorBoundary; 