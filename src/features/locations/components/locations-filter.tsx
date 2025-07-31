import React from 'react';
import { Form, InputGroup, Button, Badge } from 'react-bootstrap';

interface LocationsFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalCount: number;
  filteredCount: number;
}

export const LocationsFilter: React.FC<LocationsFilterProps> = ({
  searchTerm,
  onSearchChange,
  totalCount,
  filteredCount
}) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <h6 className="mb-0">Filter Locations</h6>
          {searchTerm && (
            <Badge bg="info" className="text-uppercase">
              {filteredCount} of {totalCount}
            </Badge>
          )}
        </div>
        {searchTerm && (
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={handleClear}
          >
            <i className="bi bi-x-circle me-1"></i>
            Clear
          </Button>
        )}
      </div>
      
      <InputGroup>
        <InputGroup.Text>
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search by location name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <Button 
            variant="outline-secondary"
            onClick={handleClear}
          >
            <i className="bi bi-x"></i>
          </Button>
        )}
      </InputGroup>
      
      {searchTerm && (
        <div className="mt-2">
          <small className="text-muted">
            Showing {filteredCount} of {totalCount} locations
            {filteredCount === 0 && (
              <span className="text-warning ms-2">
                No locations match your search
              </span>
            )}
          </small>
        </div>
      )}
    </div>
  );
}; 