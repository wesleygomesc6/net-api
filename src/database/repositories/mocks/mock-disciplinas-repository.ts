import { Injectable } from '@nestjs/common'
import { Disciplina, Prisma, Turma } from 'generated/prisma/client'
import { DisciplinasRepository } from '../disciplinas-repository'

export type DisciplinaComRelacoes = Disciplina & {
  turmas: Turma[]
}

@Injectable()
export class MockDisciplinasRepository implements DisciplinasRepository {
  public disciplinas: DisciplinaComRelacoes[] = [
    {
      id: 1,
      nome: 'Matemática',
      codigo: 'MAT101',
      createdAt: new Date(),
      turmas: [],
    },
  ]

  // Chamado pelo MockTurmasRepository para manter a relação sincronizada
  registrarTurma(disciplinaId: number, turma: Turma): void {
    const disciplina = this.disciplinas.find((d) => d.id === disciplinaId)
    if (disciplina && !disciplina.turmas.find((t) => t.id === turma.id)) {
      disciplina.turmas.push(turma)
    }
  }

  desregistrarTurma(disciplinaId: number, turmaId: number): void {
    const disciplina = this.disciplinas.find((d) => d.id === disciplinaId)
    if (disciplina) {
      disciplina.turmas = disciplina.turmas.filter((t) => t.id !== turmaId)
    }
  }

  async buscarPorId(id: number): Promise<DisciplinaComRelacoes | null> {
    const disciplina = this.disciplinas.find((d) => d.id === id)
    return disciplina ?? null
  }

  async listar(): Promise<DisciplinaComRelacoes[]> {
    return this.disciplinas
  }

  async criar(
    data: Prisma.DisciplinaCreateInput,
  ): Promise<DisciplinaComRelacoes> {
    const idAtual =
      this.disciplinas.length > 0
        ? this.disciplinas[this.disciplinas.length - 1].id
        : 0

    const disciplina: DisciplinaComRelacoes = {
      id: idAtual + 1,
      nome: data.nome,
      codigo: data.codigo,
      createdAt: new Date(),
      turmas: [],
    }

    this.disciplinas.push(disciplina)
    return disciplina
  }

  async atualizar(
    id: number,
    data: Prisma.DisciplinaUpdateInput,
  ): Promise<DisciplinaComRelacoes> {
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

  async excluir(id: number): Promise<DisciplinaComRelacoes> {
    const disciplinaIndex = this.disciplinas.findIndex((d) => d.id === id)
    if (disciplinaIndex === -1) {
      throw new Error('Disciplina não encontrada')
    }

    return this.disciplinas.splice(disciplinaIndex, 1)[0]
  }
}
