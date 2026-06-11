import cloudinary from '../config/cloudinary'
import AppError from './AppError'

export const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'center' }],
      },
      (error, result) => {
        if (error || !result) {
          reject(new AppError('Image upload to Cloudinary failed', 500))
        } else {
          resolve(result.secure_url)
        }
      },
    )
    stream.end(buffer)
  })
}
