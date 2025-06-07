# NestJS Drizzle Demo

This project is a demo application built with NestJS and Drizzle ORM. It provides a RESTful API for managing authors, books, and genres.

## Features

- **Authors Management**: Create, read, update, and delete authors.
- **Books Management**: Create, read, update, and delete books.
- **Genres Management**: Create, read, update, and delete genres.
- **Swagger Documentation**: Full API documentation available via Swagger UI.

## Prerequisites

- Node.js (v18 or later)
- Yarn package manager

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd nestjs-drizzle-demo
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up your environment variables (if needed):
   - Create a `.env` file in the root directory and add any necessary environment variables.

## Running the Application

To start the application, run:

```bash
yarn start
```

The application will be available at `http://localhost:3000`.

## API Documentation

The API documentation is available via Swagger UI. Once the application is running, visit:

```
http://localhost:3000/api
```

### API Endpoints

#### Authors

- **POST /authors**: Create a new author.
- **GET /authors**: Get all authors.
- **GET /authors/:id**: Get an author by ID.
- **PUT /authors/:id**: Update an author by ID.
- **DELETE /authors/:id**: Delete an author by ID.

#### Books

- **POST /books**: Create a new book.
- **GET /books**: Get all books.
- **GET /books/:id**: Get a book by ID.
- **PUT /books/:id**: Update a book by ID.
- **DELETE /books/:id**: Delete a book by ID.

#### Genres

- **POST /genres**: Create a new genre.
- **GET /genres**: Get all genres.
- **GET /genres/:id**: Get a genre by ID.
- **PUT /genres/:id**: Update a genre by ID.
- **DELETE /genres/:id**: Delete a genre by ID.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
