import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as authorSchema from '../authors/author.schema';
import * as bookSchema from '../books/book.schema';
import * as genreSchema from '../genres/genre.schema';
import * as dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const connectionString = `postgres://${process.env.DB_USERNAME || 'postgres'}:${
    process.env.DB_PASSWORD || 'postgrespw'
  }@${process.env.DB_HOST || 'localhost'}:${
    process.env.DB_PORT || '55000'
  }/${process.env.DB_DATABASE || 'nestjs-drizzle-db'}`;

  const pool = new Pool({
    connectionString,
  });

  const db = drizzle(pool, {
    schema: {
      ...authorSchema,
      ...bookSchema,
      ...genreSchema,
    },
  });

  try {
    // Clear existing data
    await db.delete(genreSchema.bookGenres);
    await db.delete(bookSchema.books);
    await db.delete(authorSchema.authors);
    await db.delete(genreSchema.genres);

    // Insert authors
    const [author1, author2, author3] = await db
      .insert(authorSchema.authors)
      .values([
        {
          name: 'J.K. Rowling',
          email: 'jk.rowling@example.com',
          bio: 'British author best known for the Harry Potter series',
        },
        {
          name: 'George R.R. Martin',
          email: 'grrm@example.com',
          bio: 'American novelist and short story writer, best known for A Song of Ice and Fire series',
        },
        {
          name: 'Stephen King',
          email: 'stephen.king@example.com',
          bio: 'American author of horror, supernatural fiction, suspense, and fantasy novels',
        },
      ])
      .returning();

    // Insert genres
    const [fantasy, horror, mystery] = await db
      .insert(genreSchema.genres)
      .values([
        {
          name: 'Fantasy',
          description: 'Fiction that involves magic and supernatural elements',
        },
        {
          name: 'Horror',
          description:
            'Fiction intended to scare, unsettle, or horrify the audience',
        },
        {
          name: 'Mystery',
          description:
            'Fiction that follows a crime or a puzzle that needs to be solved',
        },
      ])
      .returning();

    // Insert books
    const [book1, book2, book3] = await db
      .insert(bookSchema.books)
      .values([
        {
          title: "Harry Potter and the Philosopher's Stone",
          description: 'The first book in the Harry Potter series',
          authorId: author1.id,
          publishedAt: new Date('1997-06-26'),
        },
        {
          title: 'A Game of Thrones',
          description: 'The first book in A Song of Ice and Fire series',
          authorId: author2.id,
          publishedAt: new Date('1996-08-01'),
        },
        {
          title: 'The Shining',
          description:
            "A horror novel about a family's winter stay at an isolated hotel",
          authorId: author3.id,
          publishedAt: new Date('1977-01-28'),
        },
      ])
      .returning();

    // Link books with genres
    await db.insert(genreSchema.bookGenres).values([
      { bookId: book1.id, genreId: fantasy.id },
      { bookId: book2.id, genreId: fantasy.id },
      { bookId: book3.id, genreId: horror.id },
      { bookId: book3.id, genreId: mystery.id },
    ]);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seed();
