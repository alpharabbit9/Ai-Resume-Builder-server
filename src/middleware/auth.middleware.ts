import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import AppError from '../utils/AppError'
import catchAsync from '../utils/catchAsync'

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) throw new AppError('Not authorized. No token provided.', 401)

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
  req.user = { id: decoded.id }
  next()
})
