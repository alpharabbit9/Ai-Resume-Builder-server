import multer from 'multer'
import { Request, Response, NextFunction } from 'express'
import AppError from '../utils/AppError'

const storage = multer.memoryStorage()

const pdfFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(new AppError('Only PDF files are allowed', 400))
  }
}

const imageFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new AppError('Only image files are allowed (jpg, png, webp)', 400))
  }
}

export const uploadPdf = multer({
  storage,
  fileFilter: pdfFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
})

// Wraps multer so MulterError becomes a proper 400 AppError instead of an unhandled 500
export const handlePdfUpload = (req: Request, res: Response, next: NextFunction): void => {
  uploadPdf.single('resume')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return next(
        new AppError(
          err.code === 'LIMIT_FILE_SIZE' ? 'Resume PDF must be 5MB or less' : err.message,
          400,
        ),
      )
    }
    if (err) return next(err)
    next()
  })
}

const avatarMulter = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
})

// Wraps multer so MulterError becomes a proper 400 AppError instead of an unhandled 500
export const handleAvatarUpload = (req: Request, res: Response, next: NextFunction): void => {
  avatarMulter.single('profilePicture')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return next(
        new AppError(
          err.code === 'LIMIT_FILE_SIZE' ? 'Profile picture must be 2MB or less' : err.message,
          400,
        ),
      )
    }
    if (err) return next(err)
    next()
  })
}
