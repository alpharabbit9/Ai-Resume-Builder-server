import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'
import AppError from '../utils/AppError'

export const validate =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const errors = (result.error as ZodError).issues.map((e) => e.message).join(', ')
      return next(new AppError(errors, 400))
    }
    req.body = result.data
    next()
  }
