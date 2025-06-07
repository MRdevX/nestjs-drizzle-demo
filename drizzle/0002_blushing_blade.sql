DROP TABLE IF EXISTS "book_genres";
DROP TABLE IF EXISTS "books";
DROP TABLE IF EXISTS "authors";
DROP TABLE IF EXISTS "genres";

CREATE TABLE "authors" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "bio" text,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "authors_email_unique" UNIQUE("email")
);

CREATE TABLE "books" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "title" varchar(255) NOT NULL,
    "description" text,
    "author_id" uuid NOT NULL,
    "published_at" timestamp,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "books_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE
);

CREATE TABLE "genres" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "name" varchar(255) NOT NULL,
    "description" text,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "book_genres" (
    "book_id" uuid NOT NULL,
    "genre_id" uuid NOT NULL,
    CONSTRAINT "book_genres_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE,
    CONSTRAINT "book_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE CASCADE,
    PRIMARY KEY ("book_id", "genre_id")
);