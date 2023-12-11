import { Category } from '../category/category.model';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const isExistsCategory = await Category.findById(payload.categoryId);
  if (!isExistsCategory) {
    throw new Error(`Category id ${payload.categoryId} is not exists`);
  }
  const result = await Course.create(payload);
  return result;
};

// get all courses from db --------------
const getAllCoursesFromDB = async () => {
  const result = await Course.find();
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
};
