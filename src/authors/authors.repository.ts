import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from '../database/database.constants';
import { BaseRepository } from '../common/repositories/base.repository';
import { authors } from './author.schema';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsRepository extends BaseRepository<
  typeof authors,
  CreateAuthorDto,
  UpdateAuthorDto
> {
  protected readonly table = authors;

  constructor(
    @Inject(DATABASE_CONNECTION)
    db: NodePgDatabase,
  ) {
    super(db);
  }
}
