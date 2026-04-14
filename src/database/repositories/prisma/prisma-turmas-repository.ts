import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Prisma, Turma } from 'generated/prisma/client'
import { TurmasRepository } from '../turmas-repository'

@Injectable()
export class PrismaTurmasRepository implements TurmasRepository {
  constructor(private prisma: PrismaService) {}

  async listar(): Promise<Turma[]> {
    return await this.prisma.turma.findMany({
      include: {
        disciplina: true,
        professor: true,
        alunos: true,
      },
    })
  }

  async criar(data: Prisma.TurmaCreateInput): Promise<Turma> {
    return await this.prisma.turma.create({ data })
  }

  async atualizar(id: number, data: Prisma.TurmaUpdateInput): Promise<Turma> {
    return await this.prisma.turma.update({ where: { id }, data })
  }

  async excluir(id: number): Promise<Turma> {
    return await this.prisma.turma.delete({ where: { id } })
  }
}
