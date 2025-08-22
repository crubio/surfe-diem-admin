import { useGetLocations, useGetTideStations, useSurfSpots } from "hooks";

export interface SiteContentMetrics {
  spots: any;
  spotCount: any; // Total number of spots
  buoys?: any[]; // Assuming buoys is an array of objects, define a more specific type if available
  buoyCount?: number; // Total number of buoys
  tideStations?: any[]; // Assuming tideStations is an array of objects, define a more specific type if available
  tideStationCount?: number; // Total number of tide stations
  users?: any[]; // Assuming users
}

export function useSiteMetrics() {
  const spots = useSurfSpots();
  const buoys = useGetLocations();
  const tideStations = useGetTideStations();

  return {
    data: {
      spots: spots.data,
      spotCount: spots.data ? spots.data.length : 0,
      buoys: buoys.data,
      buoyCount: buoys.data ? buoys.data.length : 0,
      tideStations: tideStations.data,
      tideStationCount: tideStations.data ? tideStations.data.stations.length : 0,

    },
    isLoading: spots.isLoading || buoys.isLoading || tideStations.isLoading,
    isError: spots.isError || buoys.isError || tideStations.isError,
  }
}