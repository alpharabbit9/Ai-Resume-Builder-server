import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import * as authService from './auth.service'
import { RegisterDto, LoginDto, RefreshDto } from './auth.validation'

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.register(req.body as RegisterDto)

  sendResponse(res, 201, {
    success: true,
    message: 'Account created successfully',
    data: result,
  })
})

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.login(req.body as LoginDto)

  sendResponse(res, 200, {
    success: true,
    message: 'Login successful',
    data: result,
  })
})

export const refresh = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body as RefreshDto
  const result = await authService.refresh(refreshToken)

  sendResponse(res, 200, {
    success: true,
    message: 'Token refreshed',
    data: result,
  })
})
