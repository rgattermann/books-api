import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooksRepository';

@injectable()
class RentBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute(book_id: string): Promise<Book | undefined> {

    let book = await this.booksRepository.findById(book_id);

    if (!book) {
      throw new AppError('Book not found', 404);
    }

    if (book.rented) {
      throw new AppError('Unable to rent a book that is rented', 401);
    }

    book.rented = true;

    book = await this.booksRepository.save(book);

    return book;
  }
}

export default RentBookService;
