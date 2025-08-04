export interface TideStation {
  id: number;
  station_id: string;
  station_name: string;
  latitude: string;
  longitude: string;
}

export interface TideStationsResponse {
  stations: TideStation[];
}

export interface CreateTideStationRequest {
  station_id: string;
  station_name: string;
  latitude: string;
  longitude: string;
}

export interface UpdateTideStationRequest {
  station_id?: string;
  station_name?: string;
  latitude?: string;
  longitude?: string;
} 