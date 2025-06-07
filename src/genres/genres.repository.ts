import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from '../database/database.constants';
import { BaseRepository } from '../common/repositories/base.repository';
import { genres } from '../database/schema';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresRepository extends BaseRepository<
  typeof genres,
  CreateGenreDto,
  UpdateGenreDto
> {
  protected readonly table = genres;

  constructor(
    @Inject(DATABASE_CONNECTION)
    db: NodePgDatabase,
  ) {
    super(db);
  }
}
