import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { books } from '../database/schema';
import { DATABASE_CONNECTION } from '../database/database.constants';
import { CreateBookDto, UpdateBookDto } from '../dto/book.dto';
import { BaseRepository } from '../common/repositories/base.repository';

@Injectable()
export class BooksRepository extends BaseRepository<
  typeof books,
  CreateBookDto,
  UpdateBookDto
> {
  constructor(
    @Inject(DATABASE_CONNECTION)
    db: NodePgDatabase,
  ) {
    super(db, books);
  }
}
