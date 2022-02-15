import ICreateBookDTO from '@modules/books/dtos/ICreateBookDTO';
import IBooksRepository from '@modules/books/repositories/IBooksRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';

import Book from '../entities/Book';

class BooksRepository implements IBooksRepository {
  private ormRepository: MongoRepository<Book>;

  constructor() {
    this.ormRepository = getMongoRepository(Book);
  }

  public async create(data: ICreateBookDTO): Promise<Book> {
    const book = this.ormRepository.create(data);

    await this.ormRepository.save(book);

    return book;
  }
}

export default BooksRepository;