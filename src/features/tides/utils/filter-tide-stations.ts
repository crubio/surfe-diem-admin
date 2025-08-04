import { TideStation } from '@features/tides/types';

export const filterTideStationsByName = (
  stations: TideStation[],
  searchTerm: string
): TideStation[] => {
  if (!searchTerm.trim()) {
    return stations;
  }

  const term = searchTerm.toLowerCase().trim();
  
  return stations.filter(station => 
    station.station_name.toLowerCase().includes(term) ||
    station.station_id.toLowerCase().includes(term)
  );
}; 