import express from 'express';
import { categoryRoutes } from '../modules/category/category.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/categories',
    router: categoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
