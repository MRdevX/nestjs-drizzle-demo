import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({ description: 'Genre name', example: 'Fiction' })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'Genre description',
    example: 'Fictional books.',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
