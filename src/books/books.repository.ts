import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from '../database/database.constants';
import { BaseRepository } from '../common/repositories/base.repository';
import { books } from './book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksRepository extends BaseRepository<
  typeof books,
  CreateBookDto,
  UpdateBookDto
> {
  protected readonly table = books;

  constructor(
    @Inject(DATABASE_CONNECTION)
    db: NodePgDatabase,
  ) {
    super(db);
  }
}
