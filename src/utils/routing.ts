/**
 * Routing utilities for the application.
 */

export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  USERS: "/users",
  LOCATIONS: "/locations",
  SUMMARIES: "/summaries",
}

// Use with base url environment variable to make a request url
export const API_ROUTES = {
  LOGIN: "/login",
  GET_USER: "/users/me",
  LOCATIONS: "/api/v1/locations",
  USERS: "/api/v1/users",
  SUMMARIES: "/api/v1/locations/summary",
}