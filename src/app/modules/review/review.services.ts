import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { Course } from '../course/course.model';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const isExistingCourse = await Course.findById(payload.courseId);
  if (!isExistingCourse) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Course id ${payload.courseId} is not exists`,
    );
  }
  const result = await Review.create(payload);
  return result;
};

export const reviewServices = {
  createReviewIntoDB,
};
