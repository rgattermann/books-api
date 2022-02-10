import {getMongoManager, MigrationInterface, ObjectID, QueryRunner} from "typeorm";

import Book from '@modules/books/infra/typeorm/entities/Book';

export class CreateBooks1644494549551 implements MigrationInterface {

    public async up(_: QueryRunner): Promise<void> {
      const book1 = new Book();
      book1.title = '1984';
      book1.author = 'George Orwell';
      book1.pages = 275;
      book1.rented = false;

      const book2 = new Book();
      book2.title = 'Harry Potter and the Philosophers Stone';
      book2.author = 'J. K. Rowling';
      book2.pages = 314;
      book2.rented = false;

      const book3 = new Book();
      book3.title = 'The Lord of the Rings';
      book3.author = 'J.R.R Tolkien';
      book3.pages = 653;
      book3.rented = false;

      await getMongoManager().save(book1);
      await getMongoManager().save(book2);
      await getMongoManager().save(book3);
  }

  public async down(_: QueryRunner): Promise<void> {
    await getMongoManager().clear('books');
  }
}
