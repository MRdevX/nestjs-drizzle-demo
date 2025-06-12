import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { AssignGenreDto } from './dto/assign-genre.dto';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new genre',
    description: 'Creates a new genre with the provided details.',
  })
  @ApiResponse({
    status: 201,
    description: 'The genre has been successfully created.',
  })
  @ApiBody({ type: CreateGenreDto, description: 'Genre data to create.' })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all genres',
    description: 'Retrieves a list of all genres.',
  })
  @ApiResponse({ status: 200, description: 'A list of all genres.' })
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a genre by id',
    description: 'Retrieves the details of a specific genre by its ID.',
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the genre.' })
  @ApiResponse({ status: 200, description: 'The genre details.' })
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a genre',
    description: 'Updates the details of an existing genre by its ID.',
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the genre.' })
  @ApiBody({ type: UpdateGenreDto, description: 'Updated genre data.' })
  @ApiResponse({
    status: 200,
    description: 'The genre has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(id, updateGenreDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a genre',
    description: 'Deletes a genre by its ID.',
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the genre.' })
  @ApiResponse({
    status: 200,
    description: 'The genre has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.genresService.remove(id);
  }

  @Post('assign')
  @ApiOperation({
    summary: 'Assign a genre to a book',
    description: 'Assigns a genre to a book.',
  })
  @ApiResponse({
    status: 201,
    description: 'The genre has been successfully assigned to the book.',
  })
  @ApiBody({ type: AssignGenreDto, description: 'Genre assignment data.' })
  assignGenre(@Body() assignGenreDto: AssignGenreDto) {
    return this.genresService.assignGenre(assignGenreDto);
  }

  @Get('book/:bookId')
  getGenresForBook(@Param('bookId') bookId: string) {
    return this.genresService.getGenresForBook(bookId);
  }

  @Get(':genreId/books')
  getBooksForGenre(@Param('genreId') genreId: string) {
    return this.genresService.getBooksForGenre(genreId);
  }
}
