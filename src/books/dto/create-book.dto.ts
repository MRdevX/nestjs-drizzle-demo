import { IsString, IsOptional, IsUUID, IsDate } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @ApiProperty({ description: 'Book title', example: 'My Book' })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    description: 'Book description',
    example: 'A great book.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Author ID', example: 'uuid-author-id' })
  @IsUUID()
  authorId: string;

  @ApiPropertyOptional({
    description: 'Publication date',
    example: '2024-01-01',
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  publishedAt?: Date;
}
