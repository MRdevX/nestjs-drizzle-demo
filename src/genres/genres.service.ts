import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { genres, bookGenres } from './genre.schema';
import { books } from '../books/book.schema';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { AssignGenreDto } from './dto/assign-genre.dto';
import { eq, and } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../database/database.constants';

@Injectable()
export class GenresService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly db: NodePgDatabase,
  ) {}

  async create(createGenreDto: CreateGenreDto) {
    const [genre] = await this.db
      .insert(genres)
      .values({
        name: createGenreDto.name,
        description: createGenreDto.description,
      })
      .returning();
    return genre;
  }

  async findAll() {
    return this.db.select().from(genres);
  }

  async findOne(id: string) {
    const [genre] = await this.db
      .select()
      .from(genres)
      .where(eq(genres.id, id));
    if (!genre) throw new NotFoundException(`Genre with ID ${id} not found`);
    return genre;
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    const [genre] = await this.db
      .update(genres)
      .set({
        name: updateGenreDto.name,
        description: updateGenreDto.description,
      })
      .where(eq(genres.id, id))
      .returning();
    if (!genre) throw new NotFoundException(`Genre with ID ${id} not found`);
    return genre;
  }

  async remove(id: string) {
    const [genre] = await this.db
      .delete(genres)
      .where(eq(genres.id, id))
      .returning();
    if (!genre) throw new NotFoundException(`Genre with ID ${id} not found`);
    return genre;
  }

  async assignGenre(assignGenreDto: AssignGenreDto) {
    const [bookGenre] = await this.db
      .insert(bookGenres)
      .values({
        bookId: assignGenreDto.bookId,
        genreId: assignGenreDto.genreId,
      })
      .returning();
    return bookGenre;
  }

  async unassignGenreFromBook(bookId: string, genreId: string) {
    await this.db
      .delete(bookGenres)
      .where(
        and(eq(bookGenres.bookId, bookId), eq(bookGenres.genreId, genreId)),
      );
    return { message: 'Genre unassigned from book' };
  }

  async getGenresForBook(bookId: string) {
    return this.db
      .select({
        id: genres.id,
        name: genres.name,
        description: genres.description,
      })
      .from(bookGenres)
      .innerJoin(genres, eq(bookGenres.genreId, genres.id))
      .where(eq(bookGenres.bookId, bookId));
  }

  async getBooksForGenre(genreId: string) {
    return this.db
      .select({
        id: books.id,
        title: books.title,
        description: books.description,
      })
      .from(bookGenres)
      .innerJoin(books, eq(bookGenres.bookId, books.id))
      .where(eq(bookGenres.genreId, genreId));
  }
}
