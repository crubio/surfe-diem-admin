import { getLocations } from "@features/locations/api/locations";
import { LocationsList } from "@features/locations/components/locations-list";
import { CreateLocationForm } from "@features/locations/components/create-location-form";
import { LocationsFilter } from "@features/locations/components/locations-filter";
import { Loading } from "@features/ui/loading";
import { Location } from "@features/locations/types";
import { filterLocationsByName } from "@features/locations/utils/filter-locations";
import { useQuery } from "@tanstack/react-query";
import { Button, Stack, Alert, Card } from "react-bootstrap";
import { useState, useMemo } from "react";

function LocationsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data, isLoading, isError } = useQuery<Location[]>({
    queryKey: ['locations'],
    queryFn: getLocations,
  });
  
  // This can be a long list, so we memoize it
  const locations = useMemo(() => data || [], [data]);
  
  // Filter locations based on search term
  const filteredLocations = useMemo(() => {
    return filterLocationsByName(locations, searchTerm);
  }, [locations, searchTerm]);

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
  };

  const handleCancelCreate = () => {
    setShowCreateForm(false);
  };

  return (
    <div className="py-4">
      <Stack direction="horizontal" gap={3} className="mb-4">
        <div className="p-2">
          <h1>Locations</h1>
        </div>
        <div className="p-2 ms-auto"></div>
        <div className="p-2">
          <Button 
            variant="primary"
            onClick={() => setShowCreateForm(true)}
            disabled={showCreateForm}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Location
          </Button>
        </div>
      </Stack>
      
      {showCreateForm && (
        <div className="mb-4">
          <CreateLocationForm 
            onSuccess={handleCreateSuccess}
            onCancel={handleCancelCreate}
          />
        </div>
      )}
      
      <Card>
        <Card.Body>
          <Card.Text className="text-muted mb-3">
            Manage buoy locations in the database. View, edit, and add new locations.
          </Card.Text>
          
          {isLoading && <Loading text="Loading locations..." />}
          
          {isError && (
            <Alert variant="danger">
              <Alert.Heading>Error Loading Locations</Alert.Heading>
              <p>There was an error loading the locations. Please try refreshing the page.</p>
            </Alert>
          )}
          
          {!isLoading && !isError && (
            <>
              {locations.length === 0 ? (
                <Alert variant="info">
                  <Alert.Heading>No Locations Found</Alert.Heading>
                  <p>There are currently no locations in the database. Add your first location to get started.</p>
                </Alert>
              ) : (
                <>
                  <LocationsFilter
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    totalCount={locations.length}
                    filteredCount={filteredLocations.length}
                  />
                  
                  {filteredLocations.length === 0 && searchTerm ? (
                    <Alert variant="warning">
                      <Alert.Heading>No Matching Locations</Alert.Heading>
                      <p>No locations match your search term "{searchTerm}". Try a different search or clear the filter.</p>
                    </Alert>
                  ) : (
                    <LocationsList locations={filteredLocations} />
                  )}
                </>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default LocationsPage;