import { Types } from 'mongoose';

export type TReview = {
  courseId: Types.ObjectId;
  rating: number;
  review: string;
};
