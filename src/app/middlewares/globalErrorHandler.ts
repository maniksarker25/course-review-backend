import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next,
) => {
  const statusCode = err.statusCode || 500;
  const message = 'Something went wrong';
  return res
    .status(statusCode)
    .json({ success: false, message: err.message || message, error: err });
};

export default globalErrorHandler;
