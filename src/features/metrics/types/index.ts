export interface ByStatusCode {
  status: number;
  count: number;
}

export interface ByMethod {
  method: string;
  count: number;
}

export interface TopPath {
  path: string;
  count: number;
  avg_duration_ms: number;
}

export interface MetricsSummary {
  period_hours: number;
  total_requests: number;
  avg_duration_ms: number;
  by_status_code: ByStatusCode[];
  by_method: ByMethod[];
  top_paths: TopPath[];
}