import { Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { authors } from '../database/schema';
import { CreateAuthorDto, UpdateAuthorDto } from '../dto/author.dto';
import { eq } from 'drizzle-orm';

@Injectable()
export class AuthorsService {
  constructor(private readonly db: NodePgDatabase) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const [author] = await this.db
      .insert(authors)
      .values(createAuthorDto)
      .returning();
    return author;
  }

  async findAll() {
    return this.db.select().from(authors);
  }

  async findOne(id: number) {
    const [author] = await this.db
      .select()
      .from(authors)
      .where(eq(authors.id, id));
    
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const [author] = await this.db
      .update(authors)
      .set({ ...updateAuthorDto, updatedAt: new Date() })
      .where(eq(authors.id, id))
      .returning();

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return author;
  }

  async remove(id: number) {
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