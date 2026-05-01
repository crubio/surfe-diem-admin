import { axios } from "@lib/axios";
import { API_ROUTES } from "@utils/routing";
import { RatingsSummary, SpotRatingsResponse } from "../types";

export const getRatingsSummary = (limit: number = 10): Promise<RatingsSummary> => {
  return axios.get(`${API_ROUTES.RATINGS_SUMMARY}?limit=${limit}`);
};

export const getSpotRatings = (spotId: number | string): Promise<SpotRatingsResponse> => {
  return axios.get(`${API_ROUTES.SPOTS}/${spotId}/ratings`);
};
