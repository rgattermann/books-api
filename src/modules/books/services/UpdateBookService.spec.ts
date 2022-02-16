import AppError from '@shared/errors/AppError';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import CreateBookService from './CreateBookService';
import DeleteBookService from './DeleteBookService';
import RentBookService from './RentBookService';
import UpdateBookService from './UpdateBookService';

describe('UpdateBook', () => {
  it('should be able to update a book', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const createBookService = new CreateBookService(
      fakeBooksRepository,
    );

    const updateBookService = new UpdateBookService(
      fakeBooksRepository,
    );

    const book1 = await createBookService.execute({
      title: 'Fake book',
      author: 'John Doe',
      pages: 500
    });

    const book2 = await updateBookService.execute({
      id: book1.id.toString(),
      title: 'Fake book 2',
      author: 'John Doe',
      pages: 500
    });

    expect(book2.title).toBe('Fake book 2');
  });

  it('should not be able to update a non existing book', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const updateBookService = new UpdateBookService(
      fakeBooksRepository,
    );

    expect(
      updateBookService.execute({
      id: '123',
      title: 'Fake book 2',
      author: 'John Doe',
      pages: 500
    }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a rented book', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const createBookService = new CreateBookService(
      fakeBooksRepository,
    );

    const updateBookService = new UpdateBookService(
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
      updateBookService.execute({
      id: book.id.toString(),
      title: 'Fake book 2',
      author: 'John Doe',
      pages: 500
    }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
