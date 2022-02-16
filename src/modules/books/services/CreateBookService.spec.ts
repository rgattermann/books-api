import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import CreateBookService from './CreateBookService';

describe('CreateBook', () => {
  it('should be able to create a new book', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const createBookService = new CreateBookService(
      fakeBooksRepository,
    );

    const book = await createBookService.execute({
      title: 'Fake book',
      author: 'John Doe',
      pages: 500
    });

    expect(book).toHaveProperty('id');
    expect(book.title).toBe('Fake book');
  });
});
