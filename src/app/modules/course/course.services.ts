import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { Category } from '../category/category.model';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import { Review } from '../review/review.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const isExistsCategory = await Category.findById(payload.categoryId);
  if (!isExistsCategory) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Category id ${payload.categoryId} is not exists`,
    );
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

  // sorting -------------------------------
  if (query?.sortBy || query?.sortOrder) {
    const sortOrder = query?.sortOrder || 'desc';

    const sortBy = (query?.sortBy as string)?.split(',') || ['__v'];
    // console.log(sortBy);
    const sortOptions: Record<string, number> = {};
    if (sortBy.length > 1) {
      const sortByFields = sortBy?.map((field) => field.trim());
      sortByFields.forEach((field) => {
        sortOptions[field] = sortOrder === 'desc' ? -1 : 1;
      });
    }
    sortOptions[sortBy[0]] = sortOrder === 'desc' ? -1 : 1;

    // console.log(sortOptions);
    paginateQuery.sort(sortOptions);
  }

  // filter by minPrice and MaxPrice
  const minPrice = parseFloat(query?.minPrice as string);
  const maxPrice = parseFloat(query?.maxPrice as string);
  if (minPrice && maxPrice) {
    paginateQuery.where('price').gte(minPrice).lte(maxPrice);
  }

  // filter by tags --------
  const tags = query?.tags;
  if (tags) {
    paginateQuery.find({ 'tags.name': tags });
  }

  // filter by start data end date range ---------
  const startDate = query?.startDate;
  const endDate = query?.endDate;
  if (startDate && endDate) {
    paginateQuery.find({
      startDate: { $gte: startDate },
      endDate: { $lte: endDate },
    });
  }

  // filter by language---------
  const language = query?.language;
  if (language) {
    paginateQuery.find({ language: language });
  }

  // provider --------
  const provider = query?.provider;
  if (provider) {
    paginateQuery.find({ provider: provider });
  }
  // filter by duration weeeks
  const durationInWeeks = Number(query?.durationInWeeks);
  if (durationInWeeks) {
    paginateQuery.find({ durationInWeeks: durationInWeeks });
  }

  // filter by level
  const level = query?.level;
  if (level) {
    paginateQuery.find({ 'details.level': level });
  }
  const limitQuery = await paginateQuery.limit(limit);
  const totalData = await Course.countDocuments();

  return { data: limitQuery, meta: { page, limit, total: totalData } };
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...remainingData } = payload;
  const modifiedDetailsAndRemainingData: Record<string, unknown> = {
    ...remainingData,
  };
  // for details---------------
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedDetailsAndRemainingData[`details.${key}`] = value;
    }
  }
  // update details and remaining data----------
  const updateDetailsAndRemainingData = await Course.findByIdAndUpdate(
    id,
    modifiedDetailsAndRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );
  if (!updateDetailsAndRemainingData) {
    throw new Error('Failed to update course');
  }
  // update tags data ------
  if (tags && tags?.length > 0) {
    const deletedTags = tags
      ?.filter((tag) => tag.name && tag.isDeleted)
      .map((el) => el.name);
    const deleteTags = await Course.findByIdAndUpdate(
      id,
      {
        $pull: { tags: { name: { $in: deletedTags } } },
      },
      { new: true, runValidators: true },
    );
    if (!deleteTags) {
      throw new Error('Failed to update course');
    }

    const newTags = tags.filter((tag) => tag.name && !tag.isDeleted);
    const addNewTags = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          tags: { $each: newTags },
        },
      },
      { new: true, runValidators: true },
    );
    if (!addNewTags) {
      throw new Error('Failed to update course');
    }
  }
  const result = await Course.findById(id);
  return result;
};

// get single course with review from DB --------
const getSingleCourseWithReviewFromDB = async (id: string) => {
  const course = await Course.findById(id, { __v: 0 });
  const reviews = await Review.find({ courseId: id }, { _id: 0, __v: 0 });

  return { course, reviews };
};

// get best course based on average rating from db-------
const getBestCourseBasedOnAverageFromDB = async () => {
  const bestReviewsCourse = await Review.aggregate([
    {
      $group: {
        _id: '$courseId',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
    { $sort: { averageRating: -1 } },
    { $limit: 1 },
  ]);
  const bestCourse = await Course.findById(bestReviewsCourse[0]._id);
  return {
    course: bestCourse,
    averageRating: bestReviewsCourse[0].averageRating,
    reviewCount: bestReviewsCourse[0].reviewCount,
  };
};

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  updateCourseIntoDB,
  getSingleCourseWithReviewFromDB,
  getBestCourseBasedOnAverageFromDB,
};
