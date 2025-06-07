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
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          user: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        });
        return drizzle(pool, { schema });
      },
    },
  ],
  exports: ['DB'],
})
export class DatabaseModule {}
