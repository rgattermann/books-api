import ICreateBookDTO from '@modules/books/dtos/ICreateBookDTO';
import IFilterBookDTO from '@modules/books/dtos/IFilterBookDTO';
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

  public async findById(id: string): Promise<Book | undefined> {
    const book = await this.ormRepository.findOne(id);

    return book;
  }

  public async findByFilter(filter: IFilterBookDTO[]): Promise<Book[]> {

    const where = filter.map( ({key, value}) => {
      return {[key]: { $eq: value}};
    });

    const _where = where.reduce(function(result, item) {
      var key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});

    const books = await this.ormRepository.find({
      where: _where
    });

    return books;
  }

  public async findAll(): Promise<Book[]> {

    const books = await this.ormRepository.find();

    return books;
  }

  public async save(book: Book): Promise<Book> {
    return this.ormRepository.save(book);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default BooksRepository;
