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
import { GenresService } from './genres.service';
import {
  CreateGenreDto,
  UpdateGenreDto,
  AssignGenreDto,
} from '../dto/genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genresService.update(id, updateGenreDto);
  }

  @Delete(':id')
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
