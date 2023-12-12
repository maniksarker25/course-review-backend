import express from 'express';
import { categoryRoutes } from '../modules/category/category.routes';
import { courseRoutes } from '../modules/course/course.routes';
import { reviewRoutes } from '../modules/review/review.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/categories',
    router: categoryRoutes,
  },
  {
    path: '/',
    router: courseRoutes,
  },
  {
    path: '/reviews',
    router: reviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
