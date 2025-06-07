import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

  @ApiProperty({ description: 'Book price', example: 19.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Author ID', example: 'uuid-author-id' })
  @IsUUID()
  authorId: string;

  @ApiProperty({ description: 'Genre ID', example: 'uuid-genre-id' })
  @IsUUID()
  genreId: string;
}
