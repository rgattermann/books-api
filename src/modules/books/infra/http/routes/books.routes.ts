import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

import UsersController from '../controllers/BooksController';

const booksRouter = Router();
const booksController = new UsersController();

booksRouter.use(ensureAuthenticated);

booksRouter.post('/', booksController.create);

booksRouter.put('/', booksController.update);

booksRouter.get('/:book_id/detail', booksController.detail);

booksRouter.get('/', booksController.listAll);

booksRouter.delete('/:book_id', booksController.delete);

booksRouter.patch('/:book_id/rent', booksController.rent);

export default booksRouter;
