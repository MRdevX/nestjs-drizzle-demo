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
import { GenresService } from './genres.service';
import {
  CreateGenreDto,
  UpdateGenreDto,
  AssignGenreDto,
} from '../dto/genre.dto';

@ApiTags('genres')
@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @ApiOperation({ summary: 'Create genre' })
  @ApiResponse({ status: 201, description: 'Genre created.' })
  @ApiBody({ type: CreateGenreDto })
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({ status: 200, description: 'List of genres.' })
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get genre by id' })
  @ApiParam({ name: 'id', description: 'Genre ID' })
  @ApiResponse({ status: 200, description: 'Genre found.' })
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update genre' })
  @ApiParam({ name: 'id', description: 'Genre ID' })
  @ApiBody({ type: UpdateGenreDto })
  @ApiResponse({ status: 200, description: 'Genre updated.' })
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(id, updateGenreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete genre' })
  @ApiParam({ name: 'id', description: 'Genre ID' })
  @ApiResponse({ status: 200, description: 'Genre deleted.' })
  remove(@Param('id') id: string) {
    return this.genresService.remove(id);
  }

  @Put('assign')
  assignGenreToBook(@Body() assignGenreDto: AssignGenreDto) {
    return this.genresService.assignGenreToBook(
      assignGenreDto.bookId,
      assignGenreDto.genreId,
    );
  }

  @Delete('unassign')
  unassignGenreFromBook(@Body() assignGenreDto: AssignGenreDto) {
    return this.genresService.unassignGenreFromBook(
      assignGenreDto.bookId,
      assignGenreDto.genreId,
    );
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
