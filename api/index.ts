import { VercelRequest, VercelResponse } from '@vercel/node'
import '../src/config/env'
import app from '../src/app'
import { prisma } from '../src/prisma/prisma'

// Ensure database connection
let dbConnected = false

const ensureDbConnection = async () => {
  if (!dbConnected) {
    try {
      await prisma.$connect()
      dbConnected = true
      console.log('Database connected successfully')
    } catch (error) {
      console.error('Database connection failed:', error)
      throw error
    }
  }
}

export default async (req: VercelRequest, res: VercelResponse) => {
  // Ensure database is connected
  await ensureDbConnection()

  // Add CORS headers if needed for Vercel
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Handle the request with Express
  return new Promise((resolve) => {
    app(req, res)
    res.on('finish', resolve)
  })
}
