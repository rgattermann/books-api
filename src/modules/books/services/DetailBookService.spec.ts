import AppError from '@shared/errors/AppError';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import CreateBookService from './CreateBookService';
import DetailBookService from './DetailBookService';

describe('DetailBook', () => {
  it('should be able to show details from a book', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const createBookService = new CreateBookService(
      fakeBooksRepository,
    );

    const detailBookService = new DetailBookService(
      fakeBooksRepository,
    );

    const book = await createBookService.execute({
      title: 'Fake book',
      author: 'John Doe',
      pages: 500
    });

    const book_detail = await detailBookService.execute(book.id.toString());

    expect(book_detail).toHaveProperty('id');
    expect(book_detail?.title).toBe('Fake book');
  });

  it('should not be able to show details with non existing book', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const detailBookService = new DetailBookService(
      fakeBooksRepository,
    );

    expect(
      detailBookService.execute('123'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
