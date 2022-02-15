import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';

import UsersController from '../controllers/BooksController';

const booksRouter = Router();
const booksController = new UsersController();

booksRouter.use(ensureAuthenticated);

booksRouter.post('/', booksController.create);

export default booksRouter;