import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { books } from '../database/schema';
import { CreateBookDto, UpdateBookDto } from '../dto/book.dto';
import { eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../database/database.constants';

@Injectable()
export class BooksService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const [book] = await this.db
      .insert(books)
      .values(createBookDto)
      .returning();
    return book;
  }

  async findAll() {
    return this.db.select().from(books);
  }

  async findOne(id: number) {
    const [book] = await this.db.select().from(books).where(eq(books.id, id));

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const [book] = await this.db
      .update(books)
      .set({ ...updateBookDto, updatedAt: new Date() })
      .where(eq(books.id, id))
      .returning();

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async remove(id: number) {
    const [book] = await this.db
      .delete(books)
      .where(eq(books.id, id))
      .returning();

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }
}
