#!/bin/bash

echo "Creating authors..."
echo "Creating first author..."
curl -X POST http://localhost:3020/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "J.K. Rowling",
    "email": "jk.rowling@example.com",
    "bio": "British author best known for the Harry Potter series"
  }'

echo -e "\nCreating second author..."
curl -X POST http://localhost:3020/authors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "George R.R. Martin",
    "email": "grrm@example.com",
    "bio": "American novelist and short story writer, best known for A Song of Ice and Fire series"
  }'

echo -e "\nGetting all authors..."
curl http://localhost:3020/authors

echo -e "\nCreating books..."
echo "Creating first book..."
curl -X POST http://localhost:3020/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Harry Potter and the Philosopher'\''s Stone",
    "description": "The first book in the Harry Potter series",
    "authorId": 1,
    "publishedAt": "1997-06-26T00:00:00Z"
  }'

echo -e "\nCreating second book..."
curl -X POST http://localhost:3020/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Harry Potter and the Chamber of Secrets",
    "description": "The second book in the Harry Potter series",
    "authorId": 1,
    "publishedAt": "1998-07-02T00:00:00Z"
  }'

echo -e "\nCreating third book..."
curl -X POST http://localhost:3020/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "A Game of Thrones",
    "description": "The first book in A Song of Ice and Fire series",
    "authorId": 2,
    "publishedAt": "1996-08-01T00:00:00Z"
  }'

echo -e "\nGetting all books..."
curl http://localhost:3020/books

echo -e "\nUpdating first author..."
curl -X PATCH http://localhost:3020/authors/1 \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "Updated bio: British author best known for the Harry Potter series and Fantastic Beasts"
  }'

echo -e "\nUpdating first book..."
curl -X PATCH http://localhost:3020/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated description: The first book in the magical Harry Potter series"
  }'

echo -e "\nGetting updated author..."
curl http://localhost:3020/authors/1

echo -e "\nGetting updated book..."
curl http://localhost:3020/books/1

echo -e "\nCreating genres..."
curl -X POST http://localhost:3020/genres \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fantasy",
    "description": "Fantasy books"
  }'

echo -e "\nCreating second genre..."
curl -X POST http://localhost:3020/genres \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Adventure",
    "description": "Adventure books"
  }'

echo -e "\nGetting all genres..."
curl http://localhost:3020/genres

echo -e "\nAssigning genres to books..."
curl -X POST http://localhost:3020/genres/1/assign/1
curl -X POST http://localhost:3020/genres/2/assign/1
curl -X POST http://localhost:3020/genres/1/assign/2
curl -X POST http://localhost:3020/genres/2/assign/3

echo -e "\nGetting genres for book 1..."
curl http://localhost:3020/books/1

echo -e "\nGetting books for genre 1..."
curl http://localhost:3020/genres/1/books 