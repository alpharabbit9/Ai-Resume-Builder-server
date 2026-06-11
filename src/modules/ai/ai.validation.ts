import { z } from 'zod'

export const enhanceSchema = z.discriminatedUnion('section', [
  z.object({
    section: z.literal('summary'),
    content: z.string().min(1, 'Content is required'),
  }),
  z.object({
    section: z.literal('experience'),
    content: z.array(z.string()).min(1, 'At least one bullet is required'),
  }),
])

export const tailorSchema = z.object({
  resumeId: z.string().min(1, 'Resume ID is required'),
  jobDescription: z.string().min(1, 'Job description is required'),
})

export const atsScoreSchema = z.object({
  resumeId: z.string().min(1, 'Resume ID is required'),
  jobDescription: z.string().min(1, 'Job description is required'),
})

export type EnhanceDto = z.infer<typeof enhanceSchema>
export type TailorDto = z.infer<typeof tailorSchema>
export type AtsScoreDto = z.infer<typeof atsScoreSchema>
