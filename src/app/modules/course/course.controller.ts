import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import sendResponse from '../../utilities/sendResponse';
import { courseServices } from './course.services';

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

// get all courses -------------------------
const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCoursesFromDB(req.query);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course retrieved successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.updateCourseIntoDB(courseId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});
// get single course with reviews -------
const getSingleCourseWithReview = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.getSingleCourseWithReviewFromDB(courseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course and Reviews retrieved successfully',
    data: result,
  });
});
export const courseControllers = {
  createCourse,
  getAllCourses,
  updateCourse,
  getSingleCourseWithReview,
};
