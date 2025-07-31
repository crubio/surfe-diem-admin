import { Location } from '../types';

export const filterLocationsByName = (locations: Location[], searchTerm: string): Location[] => {
  if (!searchTerm.trim()) {
    return locations;
  }

  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  return locations.filter(location => {
    const name = location.name.toLowerCase();
    const locationId = location.location_id.toLowerCase();
    const description = location.description?.toLowerCase() || '';
    
    return (
      name.includes(normalizedSearch) ||
      locationId.includes(normalizedSearch) ||
      description.includes(normalizedSearch)
    );
  });
}; 