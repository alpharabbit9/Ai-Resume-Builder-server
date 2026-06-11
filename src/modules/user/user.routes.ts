import { Router } from 'express'
import { getProfile, updateProfile, updateAvatar, changePassword } from './user.controller'
import { protect } from '../../middleware/auth.middleware'
import { validate } from '../../middleware/validate.middleware'
import { handleAvatarUpload } from '../../middleware/upload.middleware'
import { updateProfileSchema, changePasswordSchema } from './user.validation'

const router = Router()

router.use(protect)

router.get('/profile', getProfile)
router.patch('/profile', validate(updateProfileSchema), updateProfile)
router.patch('/avatar', handleAvatarUpload, updateAvatar)
router.patch('/password', validate(changePasswordSchema), changePassword)

export default router
