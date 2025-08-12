import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';

interface TideStationsFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  totalCount: number;
  filteredCount: number;
}

export const TideStationsFilter: React.FC<TideStationsFilterProps> = ({
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
      <InputGroup>
        <InputGroup.Text>
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search by station name or ID..."
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
      <div className="mt-2 text-muted small">
        Showing {filteredCount} of {totalCount} stations
      </div>
    </div>
  );
}; 