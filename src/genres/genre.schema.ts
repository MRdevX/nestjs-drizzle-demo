import { pgTable, text, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';
import { books } from '../books/book.schema';

export const genres = pgTable('genres', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const bookGenres = pgTable(
  'book_genres',
  {
    bookId: uuid('book_id')
      .references(() => books.id)
      .notNull(),
    genreId: uuid('genre_id')
      .references(() => genres.id)
      .notNull(),
  },
  (table) => ({
    pk: [table.bookId, table.genreId],
  }),
);
