import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from '../../database/database.constants';
import { IBaseRepository } from './base.repository.interface';
import { eq } from 'drizzle-orm';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { InferModel } from 'drizzle-orm';

@Injectable()
export abstract class BaseRepository<
  TTable extends PgTableWithColumns<any>,
  CreateDto extends Partial<InferModel<TTable, 'insert'>>,
  UpdateDto extends Partial<InferModel<TTable, 'insert'>>,
> implements IBaseRepository<InferModel<TTable, 'select'>, CreateDto, UpdateDto>
{
  constructor(
    @Inject(DATABASE_CONNECTION)
    protected readonly db: NodePgDatabase,
    protected readonly table: TTable,
  ) {}

  async create(data: CreateDto): Promise<InferModel<TTable, 'select'>> {
    const result = await this.db
      .insert(this.table)
      .values(data as InferModel<TTable, 'insert'>)
      .returning();
    return result[0] as InferModel<TTable, 'select'>;
  }

  async findAll(): Promise<InferModel<TTable, 'select'>[]> {
    const result = await this.db.query[this.table.name].findMany();
    return result as InferModel<TTable, 'select'>[];
  }

  async findOne(id: string): Promise<InferModel<TTable, 'select'> | undefined> {
    const result = await this.db.query[this.table.name].findFirst({
      where: eq(this.table.id as any, id),
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
      .where(eq(this.table.id as any, id))
      .returning();
    return result[0] as InferModel<TTable, 'select'> | undefined;
  }

  async remove(id: string): Promise<InferModel<TTable, 'select'> | undefined> {
    const result = await this.db
      .delete(this.table)
      .where(eq(this.table.id as any, id))
      .returning();
    return result[0] as InferModel<TTable, 'select'> | undefined;
  }
}
