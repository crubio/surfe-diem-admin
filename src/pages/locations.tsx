import { getLocations } from "@features/locations/api/locations";
import { LocationsList } from "@features/locations/components/locations-list";
import { Loading } from "@features/ui/loading";
import { Location } from "@features/locations/types";
import { useQuery } from "@tanstack/react-query";
import { Button, Stack, Alert, Card } from "react-bootstrap";

function LocationsPage() {
  const { data, isLoading, isError } = useQuery<Location[]>({
    queryKey: ['locations'],
    queryFn: getLocations,
  });
  
  const locations = data || [];

  return (
    <div className="py-4">
      <Stack direction="horizontal" gap={3} className="mb-4">
        <div className="p-2">
          <h1>Locations</h1>
        </div>
        <div className="p-2 ms-auto"></div>
        <div className="p-2">
          <Button variant="primary">
            <i className="bi bi-plus-circle me-2"></i>
            Add Location
          </Button>
        </div>
      </Stack>
      
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
                <LocationsList locations={locations} />
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default LocationsPage;