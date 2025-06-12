import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignGenreDto {
  @ApiProperty({
    description: 'Book ID',
    example: 'uuid-book-id',
  })
  @IsUUID()
  @IsNotEmpty()
  bookId: string;

  @ApiProperty({
    description: 'Genre ID',
    example: 'uuid-genre-id',
  })
  @IsUUID()
  @IsNotEmpty()
  genreId: string;
}
