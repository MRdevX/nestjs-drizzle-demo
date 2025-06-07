import { IsString, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsUUID()
  authorId: string;

  @IsUUID()
  genreId: string;
}
