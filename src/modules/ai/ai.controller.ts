import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import * as aiService from './ai.service'
import { EnhanceDto, TailorDto, AtsScoreDto } from './ai.validation'

export const enhanceSection = catchAsync(async (req: Request, res: Response) => {
  const result = await aiService.enhanceSection(req.body as EnhanceDto)

  sendResponse(res, 200, {
    success: true,
    message: 'Section enhanced successfully',
    data: result,
  })
})

export const tailorResume = catchAsync(async (req: Request, res: Response) => {
  const result = await aiService.tailorResume(req.user!.id, req.body as TailorDto)

  sendResponse(res, 200, {
    success: true,
    message: 'Resume tailored successfully',
    data: result,
  })
})

export const scoreAts = catchAsync(async (req: Request, res: Response) => {
  const result = await aiService.scoreAts(req.user!.id, req.body as AtsScoreDto)

  sendResponse(res, 200, {
    success: true,
    message: 'ATS score calculated successfully',
    data: result,
  })
})
