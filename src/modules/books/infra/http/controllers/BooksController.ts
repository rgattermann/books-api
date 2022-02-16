import { container } from 'tsyringe';

import { Request, Response } from 'express';
import CreateBookService from '@modules/books/services/CreateBookService';
import ListAllBooksService from '@modules/books/services/ListAllBooksService';
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
}
