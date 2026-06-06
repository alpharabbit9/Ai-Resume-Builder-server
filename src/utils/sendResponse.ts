import { Response } from 'express'

interface ResponseData<T> {
  success: boolean
  message: string
  data?: T
  meta?: object
}

const sendResponse = <T>(res: Response, statusCode: number, payload: ResponseData<T>): void => {
  res.status(statusCode).json(payload)
}

export default sendResponse
