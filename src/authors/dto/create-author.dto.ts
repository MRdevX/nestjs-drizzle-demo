import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({
    description: 'The name of the author',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: 'The biography of the author',
    example: 'John Doe is a renowned author...',
  })
  @IsString()
  @IsOptional()
  biography?: string;
}
