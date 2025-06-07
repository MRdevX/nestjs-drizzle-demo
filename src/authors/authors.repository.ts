import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { authors } from '../database/schema';
import { DATABASE_CONNECTION } from '../database/database.constants';
import { CreateAuthorDto, UpdateAuthorDto } from '../dto/author.dto';
import { BaseRepository } from '../common/repositories/base.repository';

@Injectable()
export class AuthorsRepository extends BaseRepository<
  typeof authors,
  CreateAuthorDto,
  UpdateAuthorDto
> {
  constructor(
    @Inject(DATABASE_CONNECTION)
    db: NodePgDatabase,
  ) {
    super(db, authors);
  }
}
