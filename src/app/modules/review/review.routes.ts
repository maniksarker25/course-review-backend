import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { reviewValidations } from './review.validation';
import { reviewControllers } from './reviewController';

const router = express.Router();

router.post(
  '/',
  validationRequest(reviewValidations.createReviewValidationSchema),
  reviewControllers.createReview,
);

export const reviewRoutes = router;
