import { getLocations } from "@features/locations";
import { getSpots } from "@features/locations/api/spots";
import { getTideStation, getTideStations } from "@features/tides";
import { axios } from "@lib/axios";
import { useQuery } from "@tanstack/react-query";
import { API_ROUTES } from "@utils/routing";

/**
 * Hook for fetching all surf spots
 */
export const useSurfSpots = () => {
  return useQuery({
    queryKey: ["surfSpots"],
    queryFn: () => getSpots(),
    staleTime: 0,
  });
};

export const useGetLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: () => getLocations(),
    staleTime: 0,
  });
}

export const useGetTideStations = () => {
  // Placeholder for tide stations query
  return useQuery({
    queryKey: ["tideStations"],
    queryFn: () => getTideStations(),
    staleTime: 0,
  });
}
