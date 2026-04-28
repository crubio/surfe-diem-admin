export interface HealthStatus {
  status: string;
}

export interface HealthServicesStatus {
  status: string;
  services: Record<string, string>;
}
