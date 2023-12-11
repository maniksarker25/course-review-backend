import { z } from 'zod';

// create validation schema for tag------
const createTagValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Tag name must be a string',
    required_error: 'tag name is required',
  }),
  isDeleted: z.boolean().optional().default(false),
});

// create validation schema for details------
const createDetailsValidationSchema = z.object({
  level: z.string({
    invalid_type_error: 'Level must be a string',
    required_error: 'Level is required',
  }),
  description: z.string({
    invalid_type_error: 'Description must be a string',
    required_error: 'Description is required',
  }),
});
// create validation schema for course
const createCourseValidationSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required',
  }),
  instructor: z.string({
    invalid_type_error: 'Instructor must be a string',
    required_error: 'Instructor is required',
  }),
  categoryId: z.string({
    invalid_type_error: 'Category id must be a string',
    required_error: 'Category id is required',
  }),
  price: z.number({
    invalid_type_error: 'Price must be a number',
    required_error: 'Price is required',
  }),
  tags: z.array(createTagValidationSchema),
  startDate: z.string({
    invalid_type_error: 'Start date must be a string',
    required_error: 'Start date is required',
  }),
  endDate: z.string({
    invalid_type_error: 'End date must be a string',
    required_error: 'End date is required',
  }),
  language: z.string({
    invalid_type_error: 'Language must be a string',
    required_error: 'Language is required',
  }),
  provider: z.string({
    invalid_type_error: 'Provider must be a string',
    required_error: 'Provider is required',
  }),
  durationInWeeks: z.number().optional(),
  details: createDetailsValidationSchema,
});

export const courseValidations = {
  createCourseValidationSchema,
};
