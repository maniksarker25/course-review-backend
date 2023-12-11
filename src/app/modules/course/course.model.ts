import { Schema, model } from 'mongoose';
import { TCourse, TDetails, TTags } from './course.interface';

const tagSchema = new Schema<TTags>({
  name: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const detailsSchema = new Schema<TDetails>({
  level: {
    type: String,
    required: true,
    enum: {
      values: ['Beginner', 'Intermediate', 'Advanced'],
      message: '{VALUE} is not valid data',
    },
  },
  description: {
    type: String,
    required: true,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: [tagSchema],
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  durationInWeeks: {
    type: Number,
  },
  details: {
    type: detailsSchema,
  },
});

courseSchema.pre('save', async function (next) {
  const existingCourse = this;
  const startDate = new Date(existingCourse?.startDate);
  const endDate = new Date(existingCourse?.endDate);
  if (isNaN(startDate) || isNaN(endDate)) {
    throw new Error('Invalid date format in date');
  }
  const durationInMillisecond = endDate - startDate;
  const durationInWeeks = durationInMillisecond / (7 * 24 * 60 * 60 * 1000);
  this.durationInWeeks = Math.ceil(durationInWeeks);
  next();
});

export const Course = model<TCourse>('Course', courseSchema);
