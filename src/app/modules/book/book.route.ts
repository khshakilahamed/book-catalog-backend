import express from 'express';
import { BookController } from './book.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', BookController.getAllFromDB);
router.get('/:id', BookController.getByIdFromDB);

router.post(
  '/create-book',
  validateRequest(BookValidation.create),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertIntoDB,
);

router.patch(
  '/:id',
  validateRequest(BookValidation.update),
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.updateOneInDB,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.deleteByIdFromDB,
);

export const BookRoutes = router;
