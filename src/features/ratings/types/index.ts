export interface RatingsSummaryItem {
  spot_id: number;
  spot_slug: string;
  total: number;
  accurate: number;
  not_accurate: number;
  accuracy_pct: number;
}

export interface SpotRating {
  id: number;
  rating: "accurate" | "not_accurate";
  timestamp: string;
}

export interface SpotRatingsResponse {
  spot_id: number;
  spot_slug: string;
  summary: {
    total: number;
    accurate: number;
    not_accurate: number;
    accuracy_pct: number;
  };
  ratings: SpotRating[];
}

export type RatingsSummary = RatingsSummaryItem[];
