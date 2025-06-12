# NestJS Drizzle Demo

A demonstration project showcasing the integration of NestJS with Drizzle ORM for PostgreSQL. This project implements a simple book management system with authors, books, and genres.

## Features

- **Authors Management**: CRUD operations for authors
- **Books Management**: CRUD operations for books with author relationships
- **Genres Management**: CRUD operations for genres and book-genre relationships
- **Type Safety**: Full TypeScript support with Drizzle's type-safe queries
- **API Documentation**: Swagger/OpenAPI documentation
- **Database Migrations**: Drizzle migrations for schema management
- **Environment Configuration**: Configurable through environment variables

## Tech Stack

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Swagger](https://swagger.io/) - API documentation

## Prerequisites

- Node.js (v16 or later)
- PostgreSQL
- Yarn package manager

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:MRdevX/nestjs-drizzle-demo.git
   cd nestjs-drizzle-demo
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```env
   DB_USERNAME=postgres
   DB_PASSWORD=postgrespw
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=nestjs-drizzle-db
   ```

4. Run database migrations:

   ```bash
   yarn migrate
   ```

5. Seed the database (optional):

   ```bash
   yarn seed
   ```

## Running the Application

Development mode:

```bash
yarn start:dev
```

Production mode:

```bash
yarn build
yarn start:prod
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api
```

## Project Structure

```
src/
├── authors/           # Authors module
│   ├── dto/          # Data Transfer Objects
│   ├── author.schema.ts
│   ├── authors.controller.ts
│   └── authors.service.ts
├── books/            # Books module
│   ├── dto/
│   ├── book.schema.ts
│   ├── books.controller.ts
│   └── books.service.ts
├── genres/           # Genres module
│   ├── dto/
│   ├── genre.schema.ts
│   ├── genres.controller.ts
│   └── genres.service.ts
├── database/         # Database configuration
│   ├── database.module.ts
│   └── database.constants.ts
├── config/          # Application configuration
├── common/          # Common utilities and decorators
└── main.ts         # Application entry point
```

## Database Schema

The application uses the following database schema:

- **Authors**: Information about book authors
- **Books**: Book information with author relationships
- **Genres**: Book genres
- **BookGenres**: Many-to-many relationship between books and genres

## Testing

Run the test suite:

```bash
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [NestJS Documentation](https://docs.nestjs.com/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
