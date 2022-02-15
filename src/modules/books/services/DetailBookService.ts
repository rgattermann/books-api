import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooksRepository';

@injectable()
class DetailBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute(book_id: string): Promise<Book | undefined> {

    let book = await this.booksRepository.findById(book_id);

    if (!book) {
      throw new AppError('Book not found', 404);
    }

    return book;
  }
}

export default DetailBookService;
