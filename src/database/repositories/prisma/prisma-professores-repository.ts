import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Professor, Prisma } from 'generated/prisma/client'
import { ProfessoresRepository } from '../professores-repository'

@Injectable()
export class PrismaProfessoresRepository implements ProfessoresRepository {
  constructor(private prisma: PrismaService) {}

  async listar(): Promise<Professor[]> {
    return await this.prisma.professor.findMany()
  }

  async criar(data: Prisma.ProfessorCreateInput): Promise<Professor> {
    return await this.prisma.professor.create({ data })
  }

  async atualizar(
    id: number,
    data: Prisma.ProfessorUpdateInput,
  ): Promise<Professor> {
    return await this.prisma.professor.update({ where: { id }, data })
  }

  async excluir(id: number): Promise<Professor> {
    return await this.prisma.professor.delete({ where: { id } })
  }
}
