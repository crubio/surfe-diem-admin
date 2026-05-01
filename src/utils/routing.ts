/**
 * Routing utilities for the application.
 */

export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  USERS: "/users",
  LOCATIONS: "/locations",
  SUMMARIES: "/summaries",
  TIDE_STATIONS: "/tide-stations",
  TOOLS: "/site-tools",
  METRICS: "/metrics",
  CACHE: "/cache",
  SPOT_RATINGS: "/spot-ratings",
}

// API routes - all endpoints are now under the v1 API
export const API_ROUTES = {
  LOGIN: "/login",
  GET_USER: "/users/me",
  LOCATIONS: "/locations",
  USERS: "/users",
  SUMMARIES: "/locations/summary",
  TIDE_STATIONS: "/tides/stations",
  SPOTS: "/spots",
  RATINGS_SUMMARY: "/spots/ratings/summary",
  METRICS: "/metrics/summary",
  HEALTH: "/health",
  HEALTH_SERVICES: "/health/services",
  CACHE_STATUS: "/cache/status",
  CACHE_CLEAR: "/cache/clear",
}