import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Stack } from 'react-bootstrap';
import { TideStation, CreateTideStationRequest, UpdateTideStationRequest } from '@features/tides/types';

interface TideStationFormProps {
  station?: TideStation | null;
  onSubmit: (data: CreateTideStationRequest | UpdateTideStationRequest) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export const TideStationForm: React.FC<TideStationFormProps> = ({
  station,
  onSubmit,
  onCancel,
  isLoading = false,
  error = null
}) => {
  const [formData, setFormData] = useState<CreateTideStationRequest>({
    station_id: '',
    station_name: '',
    latitude: '',
    longitude: ''
  });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const isEditing = !!station;

  useEffect(() => {
    if (station) {
      setFormData({
        station_id: station.station_id,
        station_name: station.station_name,
        latitude: station.latitude,
        longitude: station.longitude
      });
    }
  }, [station]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.station_id.trim()) {
      errors.station_id = 'Station ID is required';
    }

    if (!formData.station_name.trim()) {
      errors.station_name = 'Station name is required';
    }

    if (!formData.latitude.trim()) {
      errors.latitude = 'Latitude is required';
    } else if (!/^-?\d+(\.\d+)?$/.test(formData.latitude)) {
      errors.latitude = 'Latitude must be a valid number';
    }

    if (!formData.longitude.trim()) {
      errors.longitude = 'Longitude is required';
    } else if (!/^-?\d+(\.\d+)?$/.test(formData.longitude)) {
      errors.longitude = 'Longitude must be a valid number';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      // Error handling is done by the parent component
    }
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">
          <i className="bi bi-water me-2"></i>
          {isEditing ? 'Edit Tide Station' : 'Create New Tide Station'}
        </h5>
      </Card.Header>
      <Card.Body>
        {error && (
          <Alert variant="danger" dismissible>
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Station ID *</Form.Label>
            <Form.Control
              type="text"
              name="station_id"
              value={formData.station_id}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.station_id}
              placeholder="e.g., 1611400"
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.station_id}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Station Name *</Form.Label>
            <Form.Control
              type="text"
              name="station_name"
              value={formData.station_name}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.station_name}
              placeholder="e.g., Nawiliwili, HI"
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.station_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Latitude *</Form.Label>
            <Form.Control
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.latitude}
              placeholder="e.g., 21.9544"
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.latitude}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Longitude *</Form.Label>
            <Form.Control
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.longitude}
              placeholder="e.g., -159.3561"
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.longitude}
            </Form.Control.Feedback>
          </Form.Group>

          <Stack direction="horizontal" gap={2} className="justify-content-end">
            <Button
              variant="outline-secondary"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-1"></i>
                  {isEditing ? 'Update Station' : 'Create Station'}
                </>
              )}
            </Button>
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  );
}; 