import { Injectable } from '@nestjs/common'
import { Prisma, Turma } from 'generated/prisma/client'
import { TurmasRepository } from '../turmas-repository'

@Injectable()
export class MockTurmasRepository implements TurmasRepository {
  private turmas: Turma[] = []

  async listar(): Promise<Turma[]> {
    return this.turmas
  }

  async criar(data: Prisma.TurmaCreateInput): Promise<Turma> {
    const idAtual =
      this.turmas.length > 0 ? this.turmas[this.turmas.length - 1].id : 0
    const turma: Turma = {
      id: idAtual + 1,
      nome: data.nome,
      disciplinaId: 1,
      professorId: 1,
      createdAt: new Date(),
    }
    this.turmas.push(turma)
    return turma
  }

  async atualizar(id: number, data: Prisma.TurmaUpdateInput): Promise<Turma> {
    const turmaIndex = this.turmas.findIndex((t) => t.id === id)
    if (turmaIndex === -1) {
      throw new Error('Turma não encontrada')
    }

    const turma = this.turmas[turmaIndex]

    if (data.nome) turma.nome = data.nome as string

    this.turmas[turmaIndex] = turma

    return turma
  }

  async excluir(id: number): Promise<Turma> {
    const turmaIndex = this.turmas.findIndex((t) => t.id === id)
    if (turmaIndex === -1) {
      throw new Error('Turma não encontrada')
    }

    return this.turmas.splice(turmaIndex, 1)[0]
  }
}
