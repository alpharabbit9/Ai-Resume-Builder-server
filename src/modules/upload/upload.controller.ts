import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import AppError from '../../utils/AppError'
import { parseAndSaveResume } from './upload.service'

export const uploadResume = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) throw new AppError('Please upload a PDF resume file.', 400)

  const resume = await parseAndSaveResume(req.user!.id, req.file.buffer)

  sendResponse(res, 201, {
    success: true,
    message: 'Resume uploaded and parsed successfully',
    data: resume,
  })
})
