import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IBooksRepository from '../repositories/IBooksRepository';

@injectable()
class DeleteBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute(book_id: string): Promise<void> {

    let book = await this.booksRepository.findById(book_id);

    if (!book) {
      throw new AppError('Book not found', 404);
    }

    if (book.rented) {
      throw new AppError('Unable to delete a book that is rented', 401);
    }

    await this.booksRepository.delete(book_id);

  }
}

export default DeleteBookService;
