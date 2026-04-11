import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { Disciplina, Prisma } from 'generated/prisma/client'
import { DisciplinasRepository } from '../disciplinas-repository'

@Injectable()
export class PrismaDisciplinasRepository implements DisciplinasRepository {
  constructor(private prisma: PrismaService) {}

  async listar(): Promise<Disciplina[]> {
    return await this.prisma.disciplina.findMany()
  }

  async criar(data: Prisma.DisciplinaCreateInput): Promise<Disciplina> {
    return await this.prisma.disciplina.create({ data })
  }

  async atualizar(
    id: number,
    data: Prisma.DisciplinaUpdateInput,
  ): Promise<Disciplina> {
    return await this.prisma.disciplina.update({ where: { id }, data })
  }

  async excluir(id: number): Promise<Disciplina> {
    return await this.prisma.disciplina.delete({ where: { id } })
  }
}
