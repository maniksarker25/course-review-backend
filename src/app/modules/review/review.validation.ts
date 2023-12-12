import { z } from 'zod';

const createReviewValidationSchema = z.object({
  courseId: z.string({
    invalid_type_error: 'Course id must be a string',
    required_error: 'Course id is required',
  }),
  rating: z
    .number({
      invalid_type_error: 'Rating must be a number',
      required_error: 'Rating is required',
    })
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating cannot exceed 5' }),
  review: z.string({
    invalid_type_error: 'Review must be a string',
    required_error: 'Review is required',
  }),
});

export const reviewValidations = {
  createReviewValidationSchema,
};
