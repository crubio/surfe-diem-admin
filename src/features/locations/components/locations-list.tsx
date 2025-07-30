import { Accordion, Button, Badge, Row, Col } from "react-bootstrap";
import { Location } from "@features/locations/types";

interface Props {
  locations: Location[];
}

export const LocationsList = (props: Props) => {
  const { locations } = props;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="locations-list">
      {locations.map((location: Location) => (
        <div key={location.id} className="mb-3">
          <Accordion>
            <Accordion.Item eventKey={location.location_id}>
              <Accordion.Header>
                <div className="d-flex justify-content-between align-items-center w-100 me-3">
                  <div>
                    <h5 className="mb-0">{location.name}</h5>
                    <small className="text-muted">ID: {location.location_id}</small>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <Badge 
                      bg={location.active ? 'success' : 'secondary'}
                      className="text-uppercase"
                    >
                      {location.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Description:</strong>
                      <p className="text-muted mb-2">
                        {location.description || 'No description available'}
                      </p>
                    </div>
                    
                    <div className="mb-3">
                      <strong>Location:</strong>
                      <p className="text-muted mb-2">
                        {location.location || 'Location not specified'}
                      </p>
                    </div>
                    
                    <div className="mb-3">
                      <strong>URL:</strong>
                      <p className="text-muted mb-2">
                        {location.url ? (
                          <a href={location.url} target="_blank" rel="noopener noreferrer">
                            {location.url}
                          </a>
                        ) : (
                          'No URL available'
                        )}
                      </p>
                    </div>
                  </Col>
                  
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>Depth:</strong>
                      <p className="text-muted mb-2">
                        {location.depth || 'Not specified'}
                      </p>
                    </div>
                    
                    <div className="mb-3">
                      <strong>Elevation:</strong>
                      <p className="text-muted mb-2">
                        {location.elevation || 'Not specified'}
                      </p>
                    </div>
                    
                    <div className="mb-3">
                      <strong>Last Updated:</strong>
                      <p className="text-muted mb-2">
                        {formatDate(location.date_updated)}
                      </p>
                    </div>
                  </Col>
                </Row>
                
                <div className="d-flex gap-2 mt-3">
                  <Button variant="outline-primary" size="sm">
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    <i className="bi bi-eye me-1"></i>
                    View Details
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
    </div>
  );
};
