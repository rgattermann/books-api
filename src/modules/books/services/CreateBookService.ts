import { inject, injectable } from 'tsyringe';

import Book from '../infra/typeorm/entities/Book';
import IBooksRepository from '../repositories/IBooksRepository';
import ICreateBookDTO from '../dtos/ICreateBookDTO';

@injectable()
class CreateBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute(data: ICreateBookDTO): Promise<Book> {

    const book = this.booksRepository.create(data);

    return book;
  }
}

export default CreateBookService;
