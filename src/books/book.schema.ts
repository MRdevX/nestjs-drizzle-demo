import { pgTable, text, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';
import { authors } from '../authors/author.schema';

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
