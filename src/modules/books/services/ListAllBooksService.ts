import { inject, injectable } from 'tsyringe';

import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooksRepository';

@injectable()
class ListAllBooksService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute(): Promise<Book[]> {
    const books = await this.booksRepository.findAll();

    return books;
  }
}

export default ListAllBooksService;
