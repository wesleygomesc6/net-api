import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Aluno, Prisma } from 'generated/prisma/client'
import { AlunosRepository } from '../alunos-repository'

@Injectable()
export class PrismaAlunosRepository implements AlunosRepository {
  constructor(private prisma: PrismaService) {}

  async listar(): Promise<Aluno[]> {
    return await this.prisma.aluno.findMany({
      include: {
        turmas: {
          include: {
            disciplina: true,
            professor: true,
          },
        },
      },
    })
  }

  async criar(data: Prisma.AlunoCreateInput): Promise<Aluno> {
    return await this.prisma.aluno.create({ data })
  }

  async atualizar(id: number, data: Prisma.AlunoUpdateInput): Promise<Aluno> {
    return await this.prisma.aluno.update({ where: { id }, data })
  }

  async excluir(id: number): Promise<Aluno> {
    return await this.prisma.aluno.delete({ where: { id } })
  }
}
