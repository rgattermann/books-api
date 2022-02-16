import AppError from '@shared/errors/AppError';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import CreateBookService from './CreateBookService';
import RentBookService from './RentBookService';

describe('RentBook', () => {
  it('should be able to rent a book', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const createBookService = new CreateBookService(
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

    const book_rented = await rentBookService.execute(book.id.toString());

    expect(book_rented?.rented).toBe(true);
  });

  it('should be able to rent a book alredy rented', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const createBookService = new CreateBookService(
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
      rentBookService.execute(book.id.toString()),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to rent a non existing book', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const rentBookService = new RentBookService(
      fakeBooksRepository,
    );

    expect(
      rentBookService.execute('123'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
