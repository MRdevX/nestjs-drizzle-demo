import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from '../dto/author.dto';
import { UpdateAuthorDto } from '../dto/author.dto';

@ApiTags('authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Create author' })
  @ApiResponse({ status: 201, description: 'Author created.' })
  @ApiBody({ type: CreateAuthorDto })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all authors' })
  @ApiResponse({ status: 200, description: 'List of authors.' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get author by id' })
  @ApiParam({ name: 'id', description: 'Author ID' })
  @ApiResponse({ status: 200, description: 'Author found.' })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update author' })
  @ApiParam({ name: 'id', description: 'Author ID' })
  @ApiBody({ type: UpdateAuthorDto })
  @ApiResponse({ status: 200, description: 'Author updated.' })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete author' })
  @ApiParam({ name: 'id', description: 'Author ID' })
  @ApiResponse({ status: 200, description: 'Author deleted.' })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
