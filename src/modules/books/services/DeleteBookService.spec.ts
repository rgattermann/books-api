import AppError from '@shared/errors/AppError';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import CreateBookService from './CreateBookService';
import DeleteBookService from './DeleteBookService';
import ListAllBooksService from './ListAllBooksService';
import RentBookService from './RentBookService';

describe('DeleteBook', () => {
  it('should be able to delete a book', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const createBookService = new CreateBookService(
      fakeBooksRepository,
    );

    const deleteBookService = new DeleteBookService(
      fakeBooksRepository,
    );

    const listAllBookService = new ListAllBooksService(
      fakeBooksRepository,
    );

    await createBookService.execute({
      title: 'Fake book',
      author: 'John Doe',
      pages: 500
    });

    const book = await createBookService.execute({
      title: 'Fake book',
      author: 'John Doe',
      pages: 500
    });

    await deleteBookService.execute(book.id.toString());

    const books = await listAllBookService.execute();

    expect(books.length).toBe(1);
  });

  it('should not be able to delete a non existing book', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const deleteBookService = new DeleteBookService(
      fakeBooksRepository,
    );

    expect(
      deleteBookService.execute('123'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a rented book', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const createBookService = new CreateBookService(
      fakeBooksRepository,
    );

    const deleteBookService = new DeleteBookService(
      fakeBooksRepository,
    );

    const rentBookService = new RentBookService(
      fakeBooksRepository,
    );

    const book = await createBookService.execute({
      title: 'Fake book',
      author: 'John Doe',
      pages: 500
    });

    await rentBookService.execute(book.id.toString());

    expect(
      deleteBookService.execute(book.id.toString()),
    ).rejects.toBeInstanceOf(AppError);
  });
});
