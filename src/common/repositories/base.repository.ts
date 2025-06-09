import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from '../../database/database.constants';
import { IBaseRepository, PaginatedResult } from './base.repository.interface';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { InferModel, eq, sql } from 'drizzle-orm';
import { QueryParams } from '../interfaces/query.interface';
import { QueryBuilder } from './query-builder';

@Injectable()
export abstract class BaseRepository<
  TTable extends PgTableWithColumns<any>,
  CreateDto extends Partial<InferModel<TTable, 'insert'>>,
  UpdateDto extends Partial<InferModel<TTable, 'insert'>>,
> implements IBaseRepository<InferModel<TTable, 'select'>, CreateDto, UpdateDto>
{
  protected abstract readonly table: TTable;
  protected queryBuilder!: QueryBuilder<TTable>;

  constructor(
    @Inject(DATABASE_CONNECTION)
    protected readonly db: NodePgDatabase,
  ) {}

  protected initializeQueryBuilder(): void {
    this.queryBuilder = new QueryBuilder<TTable>(this.table);
  }

  /**
   * Creates a new record in the database
   */
  async create(data: CreateDto): Promise<InferModel<TTable, 'select'>> {
    const result = await this.db
      .insert(this.table)
      .values(data as InferModel<TTable, 'insert'>)
      .returning();
    return result[0] as InferModel<TTable, 'select'>;
  }

  /**
   * Finds all records with pagination, sorting, filtering, and search
   */
  async findAll(
    query?: QueryParams,
  ): Promise<PaginatedResult<InferModel<TTable, 'select'>>> {
    this.initializeQueryBuilder();
    const {
      page = 1,
      limit = 10,
      sortBy,
      sortOrder = 'asc',
      search,
      searchFields,
      ...filters
    } = query || {};

    // Build query conditions
    this.queryBuilder.buildSearchConditions(search, searchFields);
    this.queryBuilder.buildFilterConditions(filters);

    // Build the base query
    const baseQuery = this.db.select().from(this.table as any);

    // Apply where conditions
    const whereConditions = this.queryBuilder.getWhereConditions();
    const queryWithWhere = whereConditions
      ? baseQuery.where(whereConditions)
      : baseQuery;

    // Apply sorting
    const sortCondition = QueryBuilder.buildSortCondition(
      this.table,
      sortBy,
      sortOrder,
    );
    const queryWithSort = sortCondition
      ? queryWithWhere.orderBy(sortCondition)
      : queryWithWhere;

    // Get total count
    const total = await this.count(query);

    // Apply pagination
    const data = await queryWithSort.limit(limit).offset((page - 1) * limit);

    return {
      data: data as InferModel<TTable, 'select'>[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Finds a single record by ID
   */
  async findOne(id: string): Promise<InferModel<TTable, 'select'> | undefined> {
    const result = await this.db
      .select()
      .from(this.table as any)
      .where(eq(this.table.id, id))
      .limit(1);
    return result[0] as InferModel<TTable, 'select'> | undefined;
  }

  /**
   * Updates a record by ID
   */
  async update(
    id: string,
    data: UpdateDto,
  ): Promise<InferModel<TTable, 'select'> | undefined> {
    const result = await this.db
      .update(this.table)
      .set({
        ...data,
        updatedAt: new Date(),
      } as InferModel<TTable, 'insert'>)
      .where(eq(this.table.id, id))
      .returning();
    return result[0] as InferModel<TTable, 'select'> | undefined;
  }

  /**
   * Removes a record by ID
   */
  async remove(id: string): Promise<InferModel<TTable, 'select'> | undefined> {
    const result = await this.db
      .delete(this.table)
      .where(eq(this.table.id, id))
      .returning();
    return result[0] as InferModel<TTable, 'select'> | undefined;
  }

  /**
   * Counts records matching the query
   */
  async count(query?: QueryParams): Promise<number> {
    this.initializeQueryBuilder();
    const { search, searchFields, ...filters } = query || {};

    // Build query conditions
    this.queryBuilder.buildSearchConditions(search, searchFields);
    this.queryBuilder.buildFilterConditions(filters);

    // Build the count query
    const baseQuery = this.db
      .select({ count: sql<number>`count(*)` })
      .from(this.table as any);

    // Apply where conditions
    const whereConditions = this.queryBuilder.getWhereConditions();
    const queryWithWhere = whereConditions
      ? baseQuery.where(whereConditions)
      : baseQuery;

    const result = await queryWithWhere;
    return Number(result[0].count);
  }
}
