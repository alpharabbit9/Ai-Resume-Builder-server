import bcrypt from 'bcryptjs'
import { prisma } from '../../prisma/prisma'
import AppError from '../../utils/AppError'
import { UpdateProfileDto, ChangePasswordDto } from './user.validation'

export const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      profilePicture: true,
      createdAt: true,
      _count: { select: { resumes: true } },
    },
  })
  if (!user) throw new AppError('User not found', 404)

  const { _count, ...rest } = user
  return { ...rest, resumeCount: _count.resumes }
}

export const updateProfile = async (userId: string, data: UpdateProfileDto) => {
  if (data.email) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } })
    if (existing && existing.id !== userId) throw new AppError('Email is already in use', 409)
  }

  return prisma.user.update({
    where: { id: userId },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.email !== undefined && { email: data.email }),
    },
    select: { id: true, name: true, email: true, profilePicture: true, createdAt: true },
  })
}

export const updateAvatar = async (userId: string, profilePictureUrl: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { profilePicture: profilePictureUrl },
    select: { id: true, name: true, email: true, profilePicture: true, createdAt: true },
  })
}

export const changePassword = async (userId: string, data: ChangePasswordDto) => {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new AppError('User not found', 404)

  const isMatch = await bcrypt.compare(data.currentPassword, user.password)
  if (!isMatch) throw new AppError('Current password is incorrect', 400)

  if (data.currentPassword === data.newPassword) {
    throw new AppError('New password must be different from the current password', 400)
  }

  const hashedPassword = await bcrypt.hash(data.newPassword, 12)
  await prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } })
}
