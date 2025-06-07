import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  publishedAt?: Date;
}

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUUID()
  authorId?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  publishedAt?: Date;
}
