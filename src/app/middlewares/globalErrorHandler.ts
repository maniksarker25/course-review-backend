import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import AppError from '../error/appError';
const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessage = '';
  let errorDetails = {};

  if (err.code === 11000) {
    message = 'Duplicate Error';
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    errorMessage = `${extractedMessage} is already exists`;
    statusCode = 400;
  } else if (err instanceof ZodError) {
    message = 'Validation Error';
    const concatedMessage = err.issues.map((issue, index) => {
      if (index === err.issues.length - 1) {
        return issue.message;
      } else {
        return issue.message + '.';
      }
    });
    errorMessage = concatedMessage.join(' ') + '.';
    errorDetails = {
      issues: err.issues,
    };
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  } else if (err?.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID';
    errorMessage = `${err.value} is not a valid ID!`;
    errorDetails = err;
  }
  return res.status(statusCode).json({
    success: false,
    message: message,
    errorMessage: errorMessage,
    errorDetails,
    stack: err?.stack || null,
    // err,
  });
};

export default globalErrorHandler;
