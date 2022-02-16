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

  public async findById(id: string): Promise<Book | undefined> {
    const book = await this.ormRepository.findOne(id);

    return book;
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
