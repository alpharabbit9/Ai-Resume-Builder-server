import { Router } from 'express'
import { getAllResumes, getResumeById, createResume, updateResume, deleteResume } from './resume.controller'
import { protect } from '../../middleware/auth.middleware'
import { validate } from '../../middleware/validate.middleware'
import { createResumeSchema, updateResumeSchema } from './resume.validation'

const router = Router()

router.use(protect)

router.get('/', getAllResumes)
router.post('/', validate(createResumeSchema), createResume)
router.get('/:id', getResumeById)
router.patch('/:id', validate(updateResumeSchema), updateResume)
router.delete('/:id', deleteResume)

export default router
