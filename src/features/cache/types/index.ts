export interface CacheEntry {
  keys: number;
  entries: string[];
  ttls_remaining_seconds: Record<string, number>;
}

export type CacheStatus = Record<string, CacheEntry>;

export interface CacheClearResponse {
  cleared: string | string[];
}
