import { callGroq } from '../../utils/groq'
import { prisma } from '../../prisma/prisma'
import AppError from '../../utils/AppError'
import { EnhanceDto, TailorDto, AtsScoreDto } from './ai.validation'

const PROMPTS = {
  summary: `You are an expert resume writer and ATS optimization specialist.
Improve the following professional summary for a software engineer role.
Make it ATS-friendly, concise (3-4 sentences), action-oriented, and tech-industry specific.
Return ONLY the improved summary text. No explanations.`,

  experience: `You are an expert resume writer.
Improve the following job experience bullets.
Each bullet must: start with a strong action verb, include quantifiable achievements where possible, be ATS-friendly, be concise (1-2 lines).
Return ONLY a JSON array of improved bullet strings. No explanations.`,

  tailor: `You are an ATS optimization expert.
Compare the candidate resume with the job description provided.
Return a JSON object with:
- missingKeywords: string[]
- highlightSkills: string[]
- suggestions: string[]
Return ONLY valid JSON. No explanations.`,

  atsScore: `You are an ATS scoring expert.
Score the provided resume against the job description on a scale of 0-100.
Return ONLY a valid JSON object with keys:
- score: number (0-100)
- missingKeywords: string[]
- matchedKeywords: string[]
- suggestions: string[]
No explanations.`,
}

export const enhanceSection = async (data: EnhanceDto) => {
  if (data.section === 'summary') {
    const result = await callGroq(PROMPTS.summary, data.content)
    return { enhanced: result.trim() }
  }

  const bulletsText = data.content.map((b, i) => `${i + 1}. ${b}`).join('\n')
  const raw = await callGroq(PROMPTS.experience, bulletsText)

  try {
    const enhanced = JSON.parse(raw) as string[]
    return { enhanced }
  } catch {
    throw new AppError('AI returned invalid response. Please try again.', 500)
  }
}

export const tailorResume = async (userId: string, data: TailorDto) => {
  const resume = await prisma.resume.findFirst({
    where: { id: data.resumeId, userId },
  })
  if (!resume) throw new AppError('Resume not found', 404)

  const userContent = `RESUME:\n${JSON.stringify(resume, null, 2)}\n\nJOB DESCRIPTION:\n${data.jobDescription}`
  const raw = await callGroq(PROMPTS.tailor, userContent)

  try {
    const result = JSON.parse(raw) as {
      missingKeywords: string[]
      highlightSkills: string[]
      suggestions: string[]
    }
    return result
  } catch {
    throw new AppError('AI returned invalid response. Please try again.', 500)
  }
}

export const scoreAts = async (userId: string, data: AtsScoreDto) => {
  const resume = await prisma.resume.findFirst({
    where: { id: data.resumeId, userId },
  })
  if (!resume) throw new AppError('Resume not found', 404)

  const userContent = `RESUME:\n${JSON.stringify(resume, null, 2)}\n\nJOB DESCRIPTION:\n${data.jobDescription}`
  const raw = await callGroq(PROMPTS.atsScore, userContent)

  try {
    const result = JSON.parse(raw) as {
      score: number
      missingKeywords: string[]
      matchedKeywords: string[]
      suggestions: string[]
    }

    await prisma.resume.update({
      where: { id: data.resumeId },
      data: {
        atsScore: result.score,
        jobDescription: data.jobDescription,
      },
    })

    return result
  } catch {
    throw new AppError('AI returned invalid response. Please try again.', 500)
  }
}
