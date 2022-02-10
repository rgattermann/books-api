import {
  Column,
  Entity,
  ObjectIdColumn,
  ObjectID,
} from 'typeorm';

@Entity('books')
class Book {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  pages: number;

  @Column()
  rented: boolean;
}

export default Book;
