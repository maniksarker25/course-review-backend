import express from 'express';
import { categoryControllers } from './category.controller';
import validationRequest from '../../middlewares/validationRequest';
import { categoryValidations } from './category.validation';

const router = express.Router();

router.post(
  '/',
  validationRequest(categoryValidations.createCategoryValidation),
  categoryControllers.createCategory,
);

export const categoryRoutes = router;
