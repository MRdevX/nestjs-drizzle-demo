import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { authors } from './author.schema';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../database/database.constants';

@Injectable()
export class AuthorsService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const [author] = await this.db
      .insert(authors)
      .values({
        name: createAuthorDto.name,
        email: createAuthorDto.email,
        bio: createAuthorDto.bio,
      })
      .returning();
    return author;
  }

  async findAll() {
    return this.db.select().from(authors);
  }

  async findOne(id: string) {
    const [author] = await this.db
      .select()
      .from(authors)
      .where(eq(authors.id, id));

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const [author] = await this.db
      .update(authors)
      .set({
        name: updateAuthorDto.name,
        email: updateAuthorDto.email,
        bio: updateAuthorDto.bio,
      })
      .where(eq(authors.id, id))
      .returning();

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return author;
  }

  async remove(id: string) {
    const [author] = await this.db
      .delete(authors)
      .where(eq(authors.id, id))
      .returning();

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return author;
  }
}
