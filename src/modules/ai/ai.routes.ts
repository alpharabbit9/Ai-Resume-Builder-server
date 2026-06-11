import { Router } from 'express'
import { enhanceSection, tailorResume, scoreAts } from './ai.controller'
import { protect } from '../../middleware/auth.middleware'
import { validate } from '../../middleware/validate.middleware'
import { enhanceSchema, tailorSchema, atsScoreSchema } from './ai.validation'

const router = Router()

router.use(protect)

router.post('/enhance', validate(enhanceSchema), enhanceSection)
router.post('/tailor', validate(tailorSchema), tailorResume)
router.post('/ats-score', validate(atsScoreSchema), scoreAts)

export default router
