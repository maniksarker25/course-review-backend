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
  let limit = 10;
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

  const limitQuery = paginateQuery.limit(limit);

  // sorting ------------
  const sortOrder = query?.sortOrder || 'desc';
  // const sortFields =
  //   (query?.sortBy as string)?.split(',')?.join(' ') || '-title';

  const sortBy = (query?.sortBy as string)?.split(',') || ['__v'];
  console.log(sortBy);
  const sortOptions: Record<string, number> = {};
  if (sortBy.length > 1) {
    const sortByFields = sortBy?.map((field) => field.trim());
    sortByFields.forEach((field) => {
      sortOptions[field] = sortOrder === 'desc' ? -1 : 1;
    });
  }
  sortOptions[sortBy[0]] = sortOrder === 'desc' ? -1 : 1;

  console.log(sortOptions);

  const sortQuery = limitQuery.sort(sortOptions);

  // filter by minPrice and MaxPrice
  const minPrice = query?.minPrice || 0;
  const maxPrice = query?.maxPrice || Infinity;
  const priceFilterQuery = await sortQuery.find({
    price: { $gte: minPrice, $lte: maxPrice },
  });
  return priceFilterQuery;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
};
