import { Router } from 'express'
import { register, login, refresh } from './auth.controller'
import { validate } from '../../middleware/validate.middleware'
import { handleAvatarUpload } from '../../middleware/upload.middleware'
import { registerSchema, loginSchema, refreshSchema } from './auth.validation'

const router = Router()

// handleAvatarUpload must run before validate so req.body is populated from multipart form
router.post('/register', handleAvatarUpload, validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.post('/refresh', validate(refreshSchema), refresh)

export default router
