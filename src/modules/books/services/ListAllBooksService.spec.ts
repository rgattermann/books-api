import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import CreateBookService from './CreateBookService';
import ListAllBooksService from './ListAllBooksService';

describe('ListAllBooks', () => {
  it('should be able to show a list of books', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const createBookService = new CreateBookService(
      fakeBooksRepository,
    );

    const listAllBooksService = new ListAllBooksService(
      fakeBooksRepository,
    );

    await createBookService.execute({
      title: 'Fake book',
      author: 'John Doe',
      pages: 500
    });

    await createBookService.execute({
      title: 'Fake book',
      author: 'John Doe',
      pages: 500
    });

    const books = await listAllBooksService.execute();

    expect(books.length).toBe(2);
  });

  it('should be able to show a empty list of books', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const listAllBooksService = new ListAllBooksService(
      fakeBooksRepository,
    );

    const books = await listAllBooksService.execute();

    expect(books.length).toBe(0);
  });
});
