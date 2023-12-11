import { z } from 'zod';
const createCategoryValidation = z.object({
  name: z.string({
    invalid_type_error: 'Category name must be a string',
    required_error: 'Category name is required',
  }),
});
export const categoryValidations = {
  createCategoryValidation,
};
