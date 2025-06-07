import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { genres, bookGenres, books } from '../database/schema';
import { CreateGenreDto, UpdateGenreDto } from '../dto/genre.dto';
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
      .values(createGenreDto)
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
      .set({ ...updateGenreDto, updatedAt: new Date() })
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

  async assignGenreToBook(bookId: string, genreId: string) {
    // Check existence
    const [book] = await this.db
      .select()
      .from(books)
      .where(eq(books.id, bookId));
    if (!book) throw new NotFoundException(`Book with ID ${bookId} not found`);
    const [genre] = await this.db
      .select()
      .from(genres)
      .where(eq(genres.id, genreId));
    if (!genre)
      throw new NotFoundException(`Genre with ID ${genreId} not found`);
    // Assign
    await this.db
      .insert(bookGenres)
      .values({ bookId, genreId })
      .onConflictDoNothing();
    return { message: 'Genre assigned to book' };
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
