import { pgTable, text, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';

export const authors = pgTable('authors', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const books = pgTable('books', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  authorId: uuid('author_id')
    .references(() => authors.id)
    .notNull(),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

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
