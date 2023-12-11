import { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Category = model<TCategory>('Category', categorySchema);
