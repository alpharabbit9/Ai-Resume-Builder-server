import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import * as resumeService from './resume.service'
import { CreateResumeDto, UpdateResumeDto } from './resume.validation'

export const getAllResumes = catchAsync(async (req: Request, res: Response) => {
  const resumes = await resumeService.getAllResumes(req.user!.id)

  sendResponse(res, 200, {
    success: true,
    message: 'Resumes fetched successfully',
    data: resumes,
    meta: { count: resumes.length },
  })
})

export const getResumeById = catchAsync(async (req: Request, res: Response) => {
  const resume = await resumeService.getResumeById(req.params.id as string, req.user!.id)

  sendResponse(res, 200, {
    success: true,
    message: 'Resume fetched successfully',
    data: resume,
  })
})

export const createResume = catchAsync(async (req: Request, res: Response) => {
  const resume = await resumeService.createResume(req.user!.id, req.body as CreateResumeDto)

  sendResponse(res, 201, {
    success: true,
    message: 'Resume created successfully',
    data: resume,
  })
})

export const updateResume = catchAsync(async (req: Request, res: Response) => {
  const resume = await resumeService.updateResume(
    req.params.id as string,
    req.user!.id,
    req.body as UpdateResumeDto,
  )

  sendResponse(res, 200, {
    success: true,
    message: 'Resume updated successfully',
    data: resume,
  })
})

export const deleteResume = catchAsync(async (req: Request, res: Response) => {
  await resumeService.deleteResume(req.params.id as string, req.user!.id)

  sendResponse(res, 200, {
    success: true,
    message: 'Resume deleted successfully',
  })
})
