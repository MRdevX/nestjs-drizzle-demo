import { QueryParams } from '../interfaces/query.interface';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IBaseRepository<T, CreateDto, UpdateDto> {
  create(data: CreateDto): Promise<T>;
  findAll(query?: QueryParams): Promise<PaginatedResult<T>>;
  findOne(id: string): Promise<T | undefined>;
  update(id: string, data: UpdateDto): Promise<T | undefined>;
  remove(id: string): Promise<T | undefined>;
  count(query?: QueryParams): Promise<number>;
}
