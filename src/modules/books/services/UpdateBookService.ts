import { inject, injectable } from 'tsyringe';

import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooksRepository';
import IUpdateBookDTO from '../dtos/IUpdateBookDTO';
import AppError from '@shared/errors/AppError';

@injectable()
class UpdateBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute(data_book: IUpdateBookDTO): Promise<Book> {

    let book = await this.booksRepository.findById(data_book.id);

    if (!book) {
      throw new AppError('Book not found', 404);
    }

    if (book.rented) {
      throw new AppError('Unable to delete a book that is rented', 401);
    }

    Object.assign(book, data_book);

    return book;
  }
}

export default UpdateBookService;
