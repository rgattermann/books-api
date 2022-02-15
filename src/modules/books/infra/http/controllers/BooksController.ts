import { container } from 'tsyringe';

import { Request, Response } from 'express';
import CreateBookService from '@modules/books/services/CreateBookService';

export default class BooksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { title, author, pages } = request.body;

    const createBook = container.resolve(CreateBookService);

    const book = await createBook.execute({title, author, pages});

    return response.json(book);
  }
}
