import './config/env'
import app from './app'
import { env } from './config/env'
import { prisma } from './prisma/prisma'

const startServer = async () => {
  try {
    await prisma.$connect()
    console.log('Database connected successfully')

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT} in ${env.NODE_ENV} mode`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! Shutting down...', err.message)
  process.exit(1)
})

process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing HTTP server...')
  await prisma.$disconnect()
  process.exit(0)
})

startServer()
