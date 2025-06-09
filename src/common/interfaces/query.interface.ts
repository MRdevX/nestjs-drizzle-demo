/**
 * Pagination parameters for querying data
 */
export interface PaginationParams {
  /** Page number (1-based) */
  page?: number;
  /** Number of items per page */
  limit?: number;
}

/**
 * Sorting parameters for querying data
 */
export interface SortParams {
  /** Field name to sort by */
  sortBy?: string;
  /** Sort direction */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Generic filter parameters
 */
export interface FilterParams {
  /** Dynamic filter fields */
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Search parameters for text-based queries
 */
export interface SearchParams {
  /** Search term */
  search?: string;
  /** Fields to search in */
  searchFields?: string[];
}

/**
 * Combined query parameters for data fetching
 */
export type QueryParams = PaginationParams &
  SortParams &
  Omit<FilterParams, keyof SearchParams> &
  SearchParams;

/**
 * Type guard to check if a value is a valid sort order
 */
export const isValidSortOrder = (value: string): value is 'asc' | 'desc' => {
  return value === 'asc' || value === 'desc';
};
