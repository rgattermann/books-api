import { container } from 'tsyringe';

import { Request, Response } from 'express';
import CreateBookService from '@modules/books/services/CreateBookService';
import ListAllBooksService from '@modules/books/services/ListAllBooksService';
import RentBookService from '@modules/books/services/RentBookService';
import DeleteBookService from '@modules/books/services/DeleteBookService';
import DetailBookService from '@modules/books/services/DetailBookService';

export default class BooksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, author, pages } = request.body;

    const createBook = container.resolve(CreateBookService);

    const book = await createBook.execute({title, author, pages});

    return response.json(book);
  }

  public async detail(request: Request, response: Response): Promise<Response> {

    const { book_id } = request.params;

    const detailBook = container.resolve(DetailBookService);

    const book = await detailBook.execute(book_id);

    if (!book) {
      return response.status(404).json();
    }

    return response.json(book);
  }

  public async listAll(request: Request, response: Response): Promise<Response> {

    const listBooks = container.resolve(ListAllBooksService);

    const books = await listBooks.execute();

    return response.json(books);
  }

  public async delete(request: Request, response: Response): Promise<Response> {

    const { book_id } = request.params;

    const deleteBook = container.resolve(DeleteBookService);

    await deleteBook.execute(book_id);

    return response.json();
  }

  public async rent(request: Request, response: Response): Promise<Response> {

    const { book_id } = request.params;

    const rentBook = container.resolve(RentBookService);

    const book = await rentBook.execute(book_id);

    return response.json(book);
  }
}
