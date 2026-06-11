import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../../prisma/prisma'
import AppError from '../../utils/AppError'
import { generateAccessToken, generateRefreshToken } from '../../utils/generateToken'
import { RegisterDto, LoginDto } from './auth.validation'

export const register = async (data: RegisterDto, profilePictureUrl?: string) => {
  const existing = await prisma.user.findUnique({ where: { email: data.email } })
  if (existing) throw new AppError('Email already in use', 409)

  const hashedPassword = await bcrypt.hash(data.password, 12)

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      ...(profilePictureUrl && { profilePicture: profilePictureUrl }),
    },
    select: { id: true, name: true, email: true, profilePicture: true, createdAt: true },
  })

  const accessToken = generateAccessToken(user.id)
  const refreshToken = generateRefreshToken(user.id)

  return { user, accessToken, refreshToken }
}

export const login = async (data: LoginDto) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } })
  if (!user) throw new AppError('Invalid email or password', 401)

  const isMatch = await bcrypt.compare(data.password, user.password)
  if (!isMatch) throw new AppError('Invalid email or password', 401)

  const accessToken = generateAccessToken(user.id)
  const refreshToken = generateRefreshToken(user.id)

  const { password: _pw, ...safeUser } = user
  return { user: safeUser, accessToken, refreshToken }
}

export const refresh = async (token: string) => {
  let decoded: { id: string }
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { id: string }
  } catch {
    throw new AppError('Invalid or expired refresh token', 401)
  }

  const user = await prisma.user.findUnique({ where: { id: decoded.id } })
  if (!user) throw new AppError('User no longer exists', 401)

  const accessToken = generateAccessToken(user.id)
  return { accessToken }
}
