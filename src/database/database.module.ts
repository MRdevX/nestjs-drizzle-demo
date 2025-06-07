import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DB',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.get('DATABASE_URL'),
        });
        return drizzle(pool, { schema });
      },
    },
  ],
  exports: ['DB'],
})
export class DatabaseModule {}
