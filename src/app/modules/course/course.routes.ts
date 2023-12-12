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

router.get('/courses', courseControllers.getAllCourses);
router.put(
  '/courses/:courseId',
  validationRequest(courseValidations.updateCourseValidationSchema),
  courseControllers.updateCourse,
);
router.get(
  '/courses/:courseId/reviews',
  courseControllers.getSingleCourseWithReview,
);
router.get('/course/best', courseControllers.getBestCourseBasedOnAverage);
export const courseRoutes = router;
