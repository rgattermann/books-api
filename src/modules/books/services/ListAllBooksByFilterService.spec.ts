import IFilterBookDTO from '../dtos/IFilterBookDTO';
import FakeBooksRepository from '../repositories/fakes/FakeBooksRepository';
import CreateBookService from './CreateBookService';
import ListAllBooksByFilterService from './ListAllBooksByFilterService';
import RentBookService from './RentBookService';

describe('ListAllBooksByFilter', () => {
  it('should be able to show a list of books by one filter', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const createBookService = new CreateBookService(
      fakeBooksRepository,
    );

    const listAllBooksByFilterService = new ListAllBooksByFilterService(
      fakeBooksRepository,
    );

    await createBookService.execute({
      title: 'Fake book',
      author: 'John Doe',
      pages: 501
    });

    await createBookService.execute({
      title: 'Fake book',
      author: 'John Doe',
      pages: 500
    });


    const filter: IFilterBookDTO[] = [];
    filter.push({key: 'title', value: 'Fake book'});

    const books = await listAllBooksByFilterService.execute(filter);

    expect(books.length).toBe(2);
  });

   it('should be able to show a list of books by two filter', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const createBookService = new CreateBookService(
      fakeBooksRepository,
    );

    const listAllBooksByFilterService = new ListAllBooksByFilterService(
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

    const filter: IFilterBookDTO[] = [];
    filter.push({key: 'title', value: 'Fake book'});
    filter.push({key: 'pages', value: 500});

    const books = await listAllBooksByFilterService.execute(filter);

    expect(books.length).toBe(2);
  });

  it('should be able to show a empty list of books', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const createBookService = new CreateBookService(
      fakeBooksRepository,
    );

    const listAllBooksByFilterService = new ListAllBooksByFilterService(
      fakeBooksRepository,
    );

    await createBookService.execute({
      title: 'book',
      author: 'John Doe',
      pages: 1287
    });

    await createBookService.execute({
      title: 'Fake',
      author: 'John Doe',
      pages: 878
    });

    const filter: IFilterBookDTO[] = [];
    filter.push({key: 'title', value: 'Fake book'});
    filter.push({key: 'pages', value: 500});

    const books = await listAllBooksByFilterService.execute(filter);

    expect(books.length).toBe(0);
  });

  it('should be able to show a list of books rented', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const createBookService = new CreateBookService(
      fakeBooksRepository,
    );

    const rentBookService = new RentBookService(
      fakeBooksRepository,
    );

    const listAllBooksByFilterService = new ListAllBooksByFilterService(
      fakeBooksRepository,
    );

    const book1 = await createBookService.execute({
      title: 'Fake book',
      author: 'John Doe',
      pages: 500
    });

    const book2 = await createBookService.execute({
      title: 'Fake book',
      author: 'John Doe',
      pages: 500
    });

    await createBookService.execute({
      title: 'Fake book',
      author: 'John Doe',
      pages: 500
    });

    await rentBookService.execute(book1.id.toString());
    await rentBookService.execute(book2.id.toString());

    const filter: IFilterBookDTO[] = [];
    filter.push({key: 'rented', value: true});

    const books = await listAllBooksByFilterService.execute(filter);

    expect(books.length).toBe(2);
  });


  it('should be able to show a list of books white empty filter', async () => {
    const fakeBooksRepository = new FakeBooksRepository();

    const createBookService = new CreateBookService(
      fakeBooksRepository,
    );

    const listAllBooksByFilterService = new ListAllBooksByFilterService(
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

    await createBookService.execute({
      title: 'Fake book',
      author: 'John Doe',
      pages: 500
    });

    const books = await listAllBooksByFilterService.execute([]);

    expect(books.length).toBe(3);
  });

});
