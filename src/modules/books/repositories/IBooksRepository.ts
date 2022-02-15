import ICreateBookDTO from '../dtos/ICreateBookDTO';
import Book from '../infra/typeorm/entities/Book';

export default interface IBooksRepository {
  create(data: ICreateBookDTO): Promise<Book>;
}