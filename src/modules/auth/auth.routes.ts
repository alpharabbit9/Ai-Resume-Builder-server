import { Router } from 'express'
import { register, login, refresh } from './auth.controller'
import { validate } from '../../middleware/validate.middleware'
import { registerSchema, loginSchema, refreshSchema } from './auth.validation'

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.post('/refresh', validate(refreshSchema), refresh)

export default router
