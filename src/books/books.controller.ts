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
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({
    summary: 'Create book',
    description: 'Creates a new book with the provided details.',
  })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created.',
  })
  @ApiBody({ type: CreateBookDto, description: 'Book data to create.' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all books',
    description: 'Retrieves a list of all books.',
  })
  @ApiResponse({ status: 200, description: 'A list of all books.' })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get book by id',
    description: 'Retrieves the details of a specific book by its ID.',
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the book.' })
  @ApiResponse({ status: 200, description: 'The book details.' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update book',
    description: 'Updates the details of an existing book by its ID.',
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the book.' })
  @ApiBody({ type: UpdateBookDto, description: 'Updated book data.' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete book',
    description: 'Deletes a book by its ID.',
  })
  @ApiParam({ name: 'id', description: 'The unique identifier of the book.' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
