import express from 'express';
import validationRequest from '../../middlewares/validationRequest';
import { courseValidations } from './course.validation';
import { courseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/course',
  validationRequest(courseValidations.createCourseValidationSchema),
  courseControllers.createCourse,
);

export const courseRoutes = router;
