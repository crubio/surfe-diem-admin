export interface Location {
  name: string,
  url: string,
  active: boolean,
  description?: string,
  depth?: string,
  elevation?: string,
  location?: string,
  location_id: string,
  id: number,
  date_created: string,
  date_updated: string
}

export interface CreateLocationRequest {
  name: string,
  url: string,
  location_id: string,
  active: string, // API expects string "true"/"false"
  description?: string,
  location?: string
}

export interface Locations {
  locations: Location[]
}