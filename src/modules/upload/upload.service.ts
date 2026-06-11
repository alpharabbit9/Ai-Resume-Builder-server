// pdf-parse v2 exports a class; the v1 @types are incompatible, so we require it manually
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PDFParse } = require('pdf-parse') as {
  PDFParse: new (opts: { data: Uint8Array }) => { getText: () => Promise<{ text: string }> }
}
import type { Prisma } from '@prisma/client'
import { callGroq } from '../../utils/groq'
import { prisma } from '../../prisma/prisma'
import AppError from '../../utils/AppError'

const PARSE_PROMPT = `You are a professional resume parser.
Extract all structured information from the resume text and return ONLY a valid JSON object with this exact shape:
{
  "title": "string — candidate's full name + 'Resume', e.g. 'John Smith Resume'",
  "personalInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string or empty string if not found",
    "location": "string or empty string if not found",
    "linkedin": "string or empty string if not found",
    "github": "string or empty string if not found",
    "website": "string or empty string if not found"
  },
  "summary": "string or empty string if not found",
  "experience": [
    {
      "company": "string",
      "role": "string",
      "startDate": "string e.g. Jan 2022",
      "endDate": "string e.g. Dec 2023 or empty string if current",
      "current": false,
      "bullets": ["string"]
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string e.g. Bachelor of Science",
      "field": "string e.g. Computer Science",
      "startDate": "string",
      "endDate": "string or empty string",
      "gpa": "string or empty string"
    }
  ],
  "skills": ["string"],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "techStack": ["string"],
      "link": "string or empty string",
      "bullets": []
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "date": "string or empty string",
      "link": "string or empty string"
    }
  ]
}
Rules:
- Use empty arrays [] for missing sections (never null for arrays).
- Use empty string "" for missing optional strings (never null).
- Return ONLY the raw JSON object. No markdown, no code blocks, no explanations.`

interface ParsedResume {
  title: string
  personalInfo: Record<string, unknown>
  summary: string
  experience: unknown[]
  education: unknown[]
  skills: string[]
  projects: unknown[]
  certifications: unknown[]
}

export const parseAndSaveResume = async (userId: string, buffer: Buffer) => {
  // 1. Extract text from PDF
  let pdfText: string
  try {
    const parser = new PDFParse({ data: new Uint8Array(buffer) })
    const result = await parser.getText()
    pdfText = result.text
  } catch {
    throw new AppError('Failed to read PDF. Please ensure it is a valid, non-corrupted PDF file.', 400)
  }

  if (!pdfText.trim()) {
    throw new AppError(
      'No text could be extracted from this PDF. Image-based or scanned PDFs are not supported.',
      400,
    )
  }

  // 2. Parse with Groq (use higher token limit for full resume JSON)
  const raw = await callGroq(PARSE_PROMPT, pdfText, 4096)

  let parsed: ParsedResume
  try {
    // Strip markdown code fences if the model wraps the response
    const clean = raw
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/```\s*$/, '')
      .trim()
    parsed = JSON.parse(clean) as ParsedResume
  } catch {
    throw new AppError('AI returned an invalid response. Please try again.', 500)
  }

  // 3. Persist as UPLOADED resume
  const resume = await prisma.resume.create({
    data: {
      userId,
      title: parsed.title || 'Uploaded Resume',
      type: 'UPLOADED',
      personalInfo: (parsed.personalInfo ?? {}) as Prisma.InputJsonValue,
      summary: parsed.summary || undefined,
      experience: (parsed.experience ?? []) as Prisma.InputJsonValue,
      education: (parsed.education ?? []) as Prisma.InputJsonValue,
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      projects: (parsed.projects ?? []) as Prisma.InputJsonValue,
      certifications: (parsed.certifications ?? []) as Prisma.InputJsonValue,
    },
  })

  return resume
}
