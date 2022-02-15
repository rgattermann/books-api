import ICreateBookDTO from '@modules/books/dtos/ICreateBookDTO';
import Book from '@modules/books/infra/typeorm/entities/Book';
import { uuid } from 'uuidv4';
import IBooksRepository from '../IBooksRepository';

class FakeBooksRepository implements IBooksRepository {
  private books: Book[] = [];

  public async create(userData: ICreateBookDTO): Promise<Book> {
    const book = new Book();

    Object.assign(book, { id: uuid() }, userData);

    this.books.push(book);

    return book;
  }
}

export default FakeBooksRepository;
