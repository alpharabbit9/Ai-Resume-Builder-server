import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import AppError from '../../utils/AppError'
import { uploadToCloudinary } from '../../utils/uploadImage'
import * as userService from './user.service'
import { UpdateProfileDto, ChangePasswordDto } from './user.validation'

export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const profile = await userService.getProfile(req.user!.id)

  sendResponse(res, 200, {
    success: true,
    message: 'Profile fetched successfully',
    data: profile,
  })
})

export const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const updated = await userService.updateProfile(req.user!.id, req.body as UpdateProfileDto)

  sendResponse(res, 200, {
    success: true,
    message: 'Profile updated successfully',
    data: updated,
  })
})

export const updateAvatar = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) throw new AppError('Please upload an image file.', 400)

  const profilePictureUrl = await uploadToCloudinary(req.file.buffer, 'resume-builder/avatars')
  const updated = await userService.updateAvatar(req.user!.id, profilePictureUrl)

  sendResponse(res, 200, {
    success: true,
    message: 'Avatar updated successfully',
    data: updated,
  })
})

export const changePassword = catchAsync(async (req: Request, res: Response) => {
  await userService.changePassword(req.user!.id, req.body as ChangePasswordDto)

  sendResponse(res, 200, {
    success: true,
    message: 'Password changed successfully',
    data: null,
  })
})
