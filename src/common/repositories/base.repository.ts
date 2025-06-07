import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from '../../database/database.constants';
import { IBaseRepository, PaginatedResult } from './base.repository.interface';
import { eq, and, or, like, SQL, sql, desc, asc } from 'drizzle-orm';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';
import { QueryParams } from '../interfaces/query.interface';

@Injectable()
export abstract class BaseRepository<
  TTable extends PgTableWithColumns<any>,
  CreateDto extends Partial<InferModel<TTable, 'insert'>>,
  UpdateDto extends Partial<InferModel<TTable, 'insert'>>,
> implements IBaseRepository<InferModel<TTable, 'select'>, CreateDto, UpdateDto>
{
  protected abstract readonly table: TTable;

  constructor(
    @Inject(DATABASE_CONNECTION)
    protected readonly db: NodePgDatabase,
  ) {}

  async create(data: CreateDto): Promise<InferModel<TTable, 'select'>> {
    const result = await this.db
      .insert(this.table)
      .values(data as InferModel<TTable, 'insert'>)
      .returning();
    return result[0] as InferModel<TTable, 'select'>;
  }

  async findAll(
    query?: QueryParams,
  ): Promise<PaginatedResult<InferModel<TTable, 'select'>>> {
    const {
      page = 1,
      limit = 10,
      sortBy,
      sortOrder = 'asc',
      search,
      searchFields,
      ...filters
    } = query || {};

    // Build where conditions
    const whereConditions: SQL[] = [];

    // Add search conditions if search term and fields are provided
    if (search && searchFields?.length) {
      const searchConditions = searchFields
        .map((field) => {
          const column = this.table[field as keyof TTable];
          return column ? like(column as any, `%${search}%`) : null;
        })
        .filter((condition): condition is SQL => condition !== null);

      if (searchConditions.length > 0) {
        const searchOr = or(...searchConditions);
        if (searchOr) {
          whereConditions.push(searchOr);
        }
      }
    }

    // Add filter conditions
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        const column = this.table[key as keyof TTable];
        if (column) {
          whereConditions.push(eq(column as any, value));
        }
      }
    });

    // Build the query
    const queryBuilder = this.db.select().from(this.table as any);

    // Apply where conditions if any
    const finalQuery =
      whereConditions.length > 0
        ? queryBuilder.where(and(...whereConditions))
        : queryBuilder;

    // Apply sorting if specified
    const sortedQuery =
      sortBy && this.table[sortBy as keyof TTable]
        ? finalQuery.orderBy(
            this.table[sortBy as keyof TTable] as any,
            sortOrder === 'desc'
              ? desc(this.table[sortBy as keyof TTable] as any)
              : asc(this.table[sortBy as keyof TTable] as any),
          )
        : finalQuery;

    // Get total count
    const total = await this.count(query);

    // Apply pagination
    const paginatedQuery = sortedQuery.limit(limit).offset((page - 1) * limit);

    // Execute query
    const data = await paginatedQuery;

    return {
      data: data as InferModel<TTable, 'select'>[],
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<InferModel<TTable, 'select'> | undefined> {
    const result = await this.db.query[this.table.name].findFirst({
      where: eq(this.table.id, id),
    });
    return result as InferModel<TTable, 'select'> | undefined;
  }

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

  async remove(id: string): Promise<InferModel<TTable, 'select'> | undefined> {
    const result = await this.db
      .delete(this.table)
      .where(eq(this.table.id, id))
      .returning();
    return result[0] as InferModel<TTable, 'select'> | undefined;
  }

  async count(query?: QueryParams): Promise<number> {
    const { search, searchFields, ...filters } = query || {};

    // Build where conditions
    const whereConditions: SQL[] = [];

    // Add search conditions if search term and fields are provided
    if (search && searchFields?.length) {
      const searchConditions = searchFields
        .map((field) => {
          const column = this.table[field as keyof TTable];
          return column ? like(column as any, `%${search}%`) : null;
        })
        .filter((condition): condition is SQL => condition !== null);

      if (searchConditions.length > 0) {
        const searchOr = or(...searchConditions);
        if (searchOr) {
          whereConditions.push(searchOr);
        }
      }
    }

    // Add filter conditions
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        const column = this.table[key as keyof TTable];
        if (column) {
          whereConditions.push(eq(column as any, value));
        }
      }
    });

    // Build the count query
    const queryBuilder = this.db
      .select({ count: sql<number>`count(*)` })
      .from(this.table as any);

    // Apply where conditions if any
    const finalQuery =
      whereConditions.length > 0
        ? queryBuilder.where(and(...whereConditions))
        : queryBuilder;

    const result = await finalQuery;
    return Number(result[0].count);
  }
}
