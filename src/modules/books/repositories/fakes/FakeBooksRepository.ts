import { uuid } from 'uuidv4';
import ICreateBookDTO from '@modules/books/dtos/ICreateBookDTO';
import Book from '@modules/books/infra/typeorm/entities/Book';
import IBooksRepository from '../IBooksRepository';
import IFilterBookDTO from '@modules/books/dtos/IFilterBookDTO';

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

  public async save(book: Book): Promise<Book> {
    const findIndex = this.books.findIndex(findBook => findBook.id === book.id);

    this.books[findIndex] = book;

    return book;
  }

  public async delete(book_id: string): Promise<void> {
    const books = this.books.filter(findBook => findBook.id.toString() !== book_id);

    this.books = books;
  }

  public async findByFilter(filter: IFilterBookDTO[]): Promise<Book[]> {
    const books = this.books.filter(book => {
      let count = 0
      for (var i = 0; i < filter.length; i++) {
        const prop = filter[i].key;

        if (book[prop as keyof Book] === filter[i].value) {
          count++;
        }
      }

      return count == filter.length;
    });

    return books;
  }
}

export default FakeBooksRepository;
