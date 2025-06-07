import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { DATABASE_CONNECTION } from './database.constants';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DATABASE_CONNECTION,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString = `postgres://${configService.get('DB_USERNAME') || 'postgres'}:${configService.get('DB_PASSWORD') || 'postgrespw'}@${configService.get('DB_HOST') || 'localhost'}:${configService.get('DB_PORT') || '55000'}/${configService.get('DB_DATABASE') || 'nestjs-drizzle-db'}`;
        const pool = new Pool({
          connectionString,
        });
        return drizzle(pool, { schema });
      },
    },
  ],
  exports: [DATABASE_CONNECTION],
})
export class DatabaseModule {}
