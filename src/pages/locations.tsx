import { getLocations } from "@features/locations/api/locations";
import { LocationsList } from "@features/locations/components/locations-list";
import { Location } from "@features/locations/types";
import { useQuery } from "@tanstack/react-query";
import { Button, Stack } from "react-bootstrap";

function LocationsPage() {
  const {data, isLoading, isFetched} = useQuery<Location[]>(['locations'], () => getLocations());
  const locations = data || [];

  return (
    <div>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2"><h1>Locations</h1></div>
        <div className="p-2 ms-auto"></div>
        <div className="p-2">
          <Button variant="primary">Add Location</Button>
        </div>
      </Stack>
      <p>A list of buoy locations in the database.</p>
      {!isLoading && isFetched && (
        <LocationsList locations={locations} />
      )}
    </div>
  );
}

export default LocationsPage;