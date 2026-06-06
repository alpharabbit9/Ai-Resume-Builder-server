import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/AppError'

const globalErrorHandler = (
  err: AppError & { code?: string },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500
  let message = err.isOperational ? err.message : 'Something went wrong'

  if (err.name === 'JsonWebTokenError') message = 'Invalid token. Please log in again.'
  if (err.name === 'TokenExpiredError') message = 'Token expired. Please log in again.'

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

export default globalErrorHandler
