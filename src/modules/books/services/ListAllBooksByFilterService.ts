import { inject, injectable } from 'tsyringe';
import IFilterBookDTO from '../dtos/IFilterBookDTO';

import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooksRepository';

@injectable()
class ListAllBooksByFilterService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute(filter: IFilterBookDTO[]): Promise<Book[]> {

    if (!filter.length) {
      const books = await this.booksRepository.findAll();

      return books;
    }

    const books = await this.booksRepository.findByFilter(filter);

    return books;
  }
}

export default ListAllBooksByFilterService;
