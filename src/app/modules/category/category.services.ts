import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

// get all categories--------
const getAllCategoriesFromDB = async () => {
  const result = await Category.find();
  return result;
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
