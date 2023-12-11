import express from 'express';
import { categoryRoutes } from '../modules/category/category.routes';
import { courseRoutes } from '../modules/course/course.routes';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
