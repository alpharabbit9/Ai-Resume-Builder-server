import { Router } from 'express'
import { uploadResume } from './upload.controller'
import { protect } from '../../middleware/auth.middleware'
import { handlePdfUpload } from '../../middleware/upload.middleware'

const router = Router()

router.use(protect)

router.post('/resume', handlePdfUpload, uploadResume)

export default router
