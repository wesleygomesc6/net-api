import { Injectable } from '@nestjs/common'
import { Disciplina, Prisma } from 'generated/prisma/client'
import { DisciplinasRepository } from '../disciplinas-repository'

@Injectable()
export class MockDisciplinasRepository implements DisciplinasRepository {
  private disciplinas: Disciplina[] = []

  async listar(): Promise<Disciplina[]> {
    return this.disciplinas
  }

  async criar(data: Prisma.DisciplinaCreateInput): Promise<Disciplina> {
    const idAtual =
      this.disciplinas.length > 0
        ? this.disciplinas[this.disciplinas.length - 1].id
        : 0
    const disciplina: Disciplina = {
      id: idAtual + 1,
      nome: data.nome,
      codigo: data.codigo,
      createdAt: new Date(),
    }
    this.disciplinas.push(disciplina)
    return disciplina
  }

  async atualizar(
    id: number,
    data: Prisma.DisciplinaUpdateInput,
  ): Promise<Disciplina> {
    const disciplinaIndex = this.disciplinas.findIndex((d) => d.id === id)
    if (disciplinaIndex === -1) {
      throw new Error('Disciplina não encontrada')
    }

    const disciplina = this.disciplinas[disciplinaIndex]

    if (data.nome) disciplina.nome = data.nome as string
    if (data.codigo) disciplina.codigo = data.codigo as string
    this.disciplinas[disciplinaIndex] = disciplina

    return disciplina
  }

  async excluir(id: number): Promise<Disciplina> {
    const disciplinaIndex = this.disciplinas.findIndex((d) => d.id === id)
    if (disciplinaIndex === -1) {
      throw new Error('Disciplina não encontrada')
    }
    return this.disciplinas.splice(disciplinaIndex, 1)[0]
  }
}
