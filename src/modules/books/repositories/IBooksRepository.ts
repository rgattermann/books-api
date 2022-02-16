import ICreateBookDTO from '../dtos/ICreateBookDTO';
import IFilterBookDTO from '../dtos/IFilterBookDTO';
import Book from '../infra/typeorm/entities/Book';

export default interface IBooksRepository {
  create(data: ICreateBookDTO): Promise<Book>;
  findById(id: string): Promise<Book | undefined>;
  findByFilter(filter: IFilterBookDTO[]): Promise<Book[]>;
  findAll(): Promise<Book[]>;
  delete(id: string): Promise<void>;
  save(book: Book): Promise<Book>;
}
