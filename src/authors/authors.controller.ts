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
  @ApiOperation({
    summary: 'Create author',
    description: 'Creates a new author with the provided details.',
  })
  @ApiResponse({
    status: 201,
    description: 'The author has been successfully created.',
  })
  @ApiBody({ type: CreateAuthorDto, description: 'Author data to create.' })
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all authors',
    description: 'Retrieves a list of all authors.',
  })
  @ApiResponse({ status: 200, description: 'A list of all authors.' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get author by id',
    description: 'Retrieves the details of a specific author by their ID.',
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the author.' })
  @ApiResponse({ status: 200, description: 'The author details.' })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update author',
    description: 'Updates the details of an existing author by their ID.',
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the author.' })
  @ApiBody({ type: UpdateAuthorDto, description: 'Updated author data.' })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete author',
    description: 'Deletes an author by their ID.',
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the author.' })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
