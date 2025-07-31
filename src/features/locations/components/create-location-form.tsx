import React, { useState } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLocation } from '../api/locations';
import { CreateLocationRequest } from '../types';
import { toast } from 'react-toastify';

interface CreateLocationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const CreateLocationForm: React.FC<CreateLocationFormProps> = ({
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState<CreateLocationRequest>({
    name: '',
    url: '',
    location_id: '',
    active: 'true',
    description: '',
    location: ''
  });

  const [validated, setValidated] = useState(false);
  const queryClient = useQueryClient();

  const createLocationMutation = useMutation({
    mutationFn: createLocation,
    onSuccess: () => {
      toast.success('Location created successfully!');
      queryClient.invalidateQueries({ queryKey: ['locations'] });
      onSuccess?.();
    },
    onError: (error: unknown) => {
      console.error('Error creating location:', error);
      const axiosError = error as { response?: { data?: { detail?: string } } };
      toast.error(axiosError.response?.data?.detail || 'Failed to create location');
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setValidated(false);
    createLocationMutation.mutate(formData);
  };

  const isSubmitting = createLocationMutation.isPending;

  return (
    <Card>
      <Card.Header>
        <Card.Title className="mb-0">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Location
        </Card.Title>
      </Card.Header>
      <Card.Body>
        {createLocationMutation.isError && (
          <Alert variant="danger" className="mb-3">
            <Alert.Heading>Error Creating Location</Alert.Heading>
            <p>
              An error occurred while creating the location. Please try again.
            </p>
          </Alert>
        )}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formLocationName">
                <Form.Label>Location Name *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Station 51001 NORTHWESTERN HAWAII ONE"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a location name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formLocationId">
                <Form.Label>Location ID *</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="location_id"
                  value={formData.location_id}
                  onChange={handleInputChange}
                  placeholder="e.g., 51001"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a location ID.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formUrl">
                <Form.Label>URL *</Form.Label>
                <Form.Control
                  required
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://www.ndbc.noaa.gov/station_page.php?station=51001"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid URL.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formActive">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="active"
                  value={formData.active}
                  onChange={handleInputChange}
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formLocation">
                <Form.Label>Coordinates</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., 24.475 N 162.030 W"
                />
                <Form.Text className="text-muted">
                  Optional: Geographic coordinates
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="e.g., 2.1-meter ionomer foam buoy - SCOOP payload"
            />
            <Form.Text className="text-muted">
              Optional: Additional details about the location
            </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            {onCancel && (
              <Button 
                variant="outline-secondary" 
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}
            <Button 
              variant="primary" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating...
                </>
              ) : (
                <>
                  <i className="bi bi-plus-circle me-2"></i>
                  Create Location
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}; 