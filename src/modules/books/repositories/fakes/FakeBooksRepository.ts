import { uuid } from 'uuidv4';
import ICreateBookDTO from '@modules/books/dtos/ICreateBookDTO';
import Book from '@modules/books/infra/typeorm/entities/Book';
import IBooksRepository from '../IBooksRepository';

class FakeBooksRepository implements IBooksRepository {
  private books: Book[] = [];

  public async create(userData: ICreateBookDTO): Promise<Book> {
    const book = new Book();

    Object.assign(book, { id: uuid() }, userData);

    this.books.push(book);

    return book;
  }

  public async findById(id: string): Promise<Book | undefined> {
    const book = this.books.find(b => b.id.toString() === id);

    return book;
  }

  public findAll(): Promise<Book[]> {
    return Promise.all(this.books);
  }
}

export default FakeBooksRepository;
