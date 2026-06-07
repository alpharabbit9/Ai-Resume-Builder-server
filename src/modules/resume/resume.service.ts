import { prisma } from '../../prisma/prisma'
import AppError from '../../utils/AppError'
import { CreateResumeDto, UpdateResumeDto } from './resume.validation'

export const getAllResumes = async (userId: string) => {
  return prisma.resume.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      title: true,
      type: true,
      templateId: true,
      atsScore: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

export const getResumeById = async (id: string, userId: string) => {
  const resume = await prisma.resume.findUnique({ where: { id } })
  if (!resume) throw new AppError('Resume not found', 404)
  if (resume.userId !== userId) throw new AppError('Not authorized to access this resume', 403)
  return resume
}

export const createResume = async (userId: string, data: CreateResumeDto) => {
  return prisma.resume.create({
    data: {
      userId,
      title: data.title,
      personalInfo: data.personalInfo,
      summary: data.summary,
      experience: data.experience,
      education: data.education,
      skills: data.skills,
      projects: data.projects,
      certifications: data.certifications,
      templateId: data.templateId,
      jobDescription: data.jobDescription,
    },
  })
}

export const updateResume = async (id: string, userId: string, data: UpdateResumeDto) => {
  const resume = await prisma.resume.findUnique({ where: { id } })
  if (!resume) throw new AppError('Resume not found', 404)
  if (resume.userId !== userId) throw new AppError('Not authorized to update this resume', 403)

  return prisma.resume.update({
    where: { id },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.personalInfo && { personalInfo: data.personalInfo }),
      ...(data.summary !== undefined && { summary: data.summary }),
      ...(data.experience && { experience: data.experience }),
      ...(data.education && { education: data.education }),
      ...(data.skills && { skills: data.skills }),
      ...(data.projects && { projects: data.projects }),
      ...(data.certifications && { certifications: data.certifications }),
      ...(data.templateId && { templateId: data.templateId }),
      ...(data.jobDescription !== undefined && { jobDescription: data.jobDescription }),
    },
  })
}

export const deleteResume = async (id: string, userId: string) => {
  const resume = await prisma.resume.findUnique({ where: { id } })
  if (!resume) throw new AppError('Resume not found', 404)
  if (resume.userId !== userId) throw new AppError('Not authorized to delete this resume', 403)

  await prisma.resume.delete({ where: { id } })
}
