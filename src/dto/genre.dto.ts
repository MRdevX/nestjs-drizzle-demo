import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateGenreDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class AssignGenreDto {
  @IsUUID()
  @IsNotEmpty()
  bookId: string;

  @IsUUID()
  @IsNotEmpty()
  genreId: string;
}
