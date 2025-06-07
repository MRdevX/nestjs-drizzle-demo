export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  [key: string]: any;
}

export interface SearchParams {
  search?: string;
  searchFields?: string[];
}

export interface QueryParams
  extends PaginationParams,
    SortParams,
    FilterParams,
    SearchParams {}
