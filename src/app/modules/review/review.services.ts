import { Course } from '../course/course.model';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const isExistingCourse = await Course.findById(payload.courseId);
  if (!isExistingCourse) {
    throw new Error(`Course id ${payload.courseId} is not exists`);
  }
  const result = await Review.create(payload);
  return result;
};

export const reviewServices = {
  createReviewIntoDB,
};
