export interface IBaseRepository<T, CreateDto, UpdateDto> {
  create(data: CreateDto): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T | undefined>;
  update(id: string, data: UpdateDto): Promise<T | undefined>;
  remove(id: string): Promise<T | undefined>;
}
