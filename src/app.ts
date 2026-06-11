import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import corsOptions from './config/corsOptions'
import globalErrorHandler from './middleware/error.middleware'
import AppError from './utils/AppError'
import authRoutes from './modules/auth/auth.routes'
import resumeRoutes from './modules/resume/resume.routes'
import aiRoutes from './modules/ai/ai.routes'
import uploadRoutes from './modules/upload/upload.routes'
import userRoutes from './modules/user/user.routes'

const app = express()

app.use(helmet())
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' })
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/resume', resumeRoutes)
app.use('/api/v1/ai', aiRoutes)
app.use('/api/v1/upload', uploadRoutes)
app.use('/api/v1/user', userRoutes)

app.all('/{*path}', (req, _res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404))
})

app.use(globalErrorHandler)

export default app
