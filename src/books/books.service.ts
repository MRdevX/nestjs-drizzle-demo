import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { books } from './book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
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
      .values({
        title: createBookDto.title,
        description: createBookDto.description,
        authorId: createBookDto.authorId,
        publishedAt: createBookDto.publishedAt,
      })
      .returning();
    return book;
  }

  async findAll() {
    return this.db.select().from(books);
  }

  async findOne(id: string) {
    const [book] = await this.db.select().from(books).where(eq(books.id, id));

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const [book] = await this.db
      .update(books)
      .set({
        title: updateBookDto.title,
        description: updateBookDto.description,
        authorId: updateBookDto.authorId,
        publishedAt: updateBookDto.publishedAt,
      })
      .where(eq(books.id, id))
      .returning();

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async remove(id: string) {
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
