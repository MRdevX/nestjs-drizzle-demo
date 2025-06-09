import { SQL, and, or, like, eq, desc, asc } from 'drizzle-orm';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { QueryParams } from '../interfaces/query.interface';

export class QueryBuilder<TTable extends PgTableWithColumns<any>> {
  private whereConditions: SQL[] = [];

  constructor(private readonly table: TTable) {}

  /**
   * Builds search conditions for the query
   */
  buildSearchConditions(search?: string, searchFields?: string[]): void {
    if (!search || !searchFields?.length) return;

    const searchConditions = searchFields
      .map((field) => {
        const column = this.table[field as keyof TTable];
        return column ? like(column as any, `%${search}%`) : null;
      })
      .filter((condition): condition is SQL => condition !== null);

    if (searchConditions.length > 0) {
      const searchOr = or(...searchConditions);
      if (searchOr) {
        this.whereConditions.push(searchOr);
      }
    }
  }

  /**
   * Builds filter conditions for the query
   */
  buildFilterConditions(filters: Record<string, any>): void {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        const column = this.table[key as keyof TTable];
        if (column) {
          this.whereConditions.push(eq(column as any, value));
        }
      }
    });
  }

  /**
   * Gets the final where conditions
   */
  getWhereConditions(): SQL | undefined {
    return this.whereConditions.length > 0
      ? and(...this.whereConditions)
      : undefined;
  }

  /**
   * Builds sorting conditions
   */
  static buildSortCondition<T extends PgTableWithColumns<any>>(
    table: T,
    sortBy?: string,
    sortOrder: 'asc' | 'desc' = 'asc',
  ) {
    if (!sortBy || !table[sortBy as keyof T]) return undefined;

    const column = table[sortBy as keyof T];
    return sortOrder === 'desc' ? desc(column as any) : asc(column as any);
  }
}
