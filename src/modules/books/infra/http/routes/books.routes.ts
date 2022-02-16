import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import BooksController from '../controllers/BooksController';

const booksRouter = Router();
const booksController = new BooksController();

booksRouter.use(ensureAuthenticated);

booksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      author: Joi.string().required(),
      pages: Joi.number().required(),
    },
  }),
  booksController.create,
);

booksRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      title: Joi.string().required(),
      author: Joi.string().required(),
      pages: Joi.number().required(),
    },
  }),
  booksController.update,
);

booksRouter.get('/:book_id/detail', booksController.detail);

booksRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      title: Joi.string().optional(),
      author: Joi.string().optional(),
      pages: Joi.number().optional(),
      rented: Joi.bool().optional()
    },
  }),
  booksController.listAll,
);

booksRouter.delete('/:book_id', booksController.delete);

booksRouter.patch('/:book_id/rent', booksController.rent);

export default booksRouter;
