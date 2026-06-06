import { Request } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
      }
    }
  }
}

export interface PersonalInfo {
  fullName: string
  email: string
  phone?: string
  location?: string
  linkedin?: string
  github?: string
  website?: string
}

export interface ExperienceEntry {
  company: string
  role: string
  startDate: string
  endDate?: string
  current?: boolean
  bullets: string[]
}

export interface EducationEntry {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  gpa?: string
}

export interface ProjectEntry {
  name: string
  description: string
  techStack: string[]
  link?: string
  bullets?: string[]
}

export interface CertificationEntry {
  name: string
  issuer: string
  date?: string
  link?: string
}

export interface ResumeData {
  title: string
  personalInfo: PersonalInfo
  summary?: string
  experience: ExperienceEntry[]
  education: EducationEntry[]
  skills: string[]
  projects: ProjectEntry[]
  certifications: CertificationEntry[]
  templateId?: string
  jobDescription?: string
}
