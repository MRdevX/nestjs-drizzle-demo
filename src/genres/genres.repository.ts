import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { genres } from '../database/schema';
import { DATABASE_CONNECTION } from '../database/database.constants';
import { CreateGenreDto, UpdateGenreDto } from '../dto/genre.dto';
import { BaseRepository } from '../common/repositories/base.repository';

@Injectable()
export class GenresRepository extends BaseRepository<
  typeof genres,
  CreateGenreDto,
  UpdateGenreDto
> {
  constructor(
    @Inject(DATABASE_CONNECTION)
    db: NodePgDatabase,
  ) {
    super(db, genres);
  }
}
