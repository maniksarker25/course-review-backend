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
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  // paginate all course ---
  let limit = 1;
  let page = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit);
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = Course.find().skip(skip);

  const limitQuery = await paginateQuery.limit(limit);

  return limitQuery;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
};
