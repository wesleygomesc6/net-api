import { Injectable, Inject, forwardRef } from '@nestjs/common'
import { Prisma, Professor, Turma } from 'generated/prisma/client'
import { ProfessoresRepository } from '../professores-repository'
import { MockTurmasRepository } from './mock-turmas-repository'

export type ProfessorComRelacoes = Professor & {
  turmas: Turma[]
}

@Injectable()
export class MockProfessoresRepository implements ProfessoresRepository {
  public professores: ProfessorComRelacoes[] = [
    {
      id: 1,
      nome: 'Jane Smith',
      email: 'jane.smith@example.com',
      nascimento: new Date('1980-01-01'),
      createdAt: new Date(),
      turmas: [],
    },
  ]

  constructor(
    @Inject(forwardRef(() => MockTurmasRepository))
    private readonly turmasRepository: MockTurmasRepository,
  ) {}

  // Chamado pelo MockTurmasRepository para manter a relação sincronizada
  registrarTurma(professorId: number, turma: Turma): void {
    const professor = this.professores.find((p) => p.id === professorId)
    if (professor && !professor.turmas.find((t) => t.id === turma.id)) {
      professor.turmas.push(turma)
    }
  }

  desregistrarTurma(professorId: number, turmaId: number): void {
    const professor = this.professores.find((p) => p.id === professorId)
    if (professor) {
      professor.turmas = professor.turmas.filter((t) => t.id !== turmaId)
    }
  }

  async buscarPorId(id: number): Promise<ProfessorComRelacoes | null> {
    const professor = this.professores.find((p) => p.id === id)
    return professor ?? null
  }

  async listar(): Promise<ProfessorComRelacoes[]> {
    return this.professores
  }

  async criar(
    data: Prisma.ProfessorCreateInput,
  ): Promise<ProfessorComRelacoes> {
    const idAtual =
      this.professores.length > 0
        ? this.professores[this.professores.length - 1].id
        : 0

    const turmasDoProfessor: Turma[] = []
    if (data.turmas?.connect) {
      for (const con of data.turmas.connect as { id: number }[]) {
        const turma = await this.turmasRepository.buscarPorId(con.id)
        if (turma) {
          turmasDoProfessor.push({
            id: turma.id,
            nome: turma.nome,
            disciplinaId: turma.disciplinaId,
            professorId: turma.professorId,
            createdAt: turma.createdAt,
          })
        }
      }
    }

    const professor: ProfessorComRelacoes = {
      id: idAtual + 1,
      nome: data.nome,
      email: data.email,
      nascimento: new Date(data.nascimento as string),
      createdAt: new Date(),
      turmas: turmasDoProfessor,
    }

    this.professores.push(professor)
    return professor
  }

  async atualizar(
    id: number,
    data: Prisma.ProfessorUpdateInput,
  ): Promise<ProfessorComRelacoes> {
    const professorIndex = this.professores.findIndex((p) => p.id === id)
    if (professorIndex === -1) {
      throw new Error('Professor não encontrado')
    }

    const professor = this.professores[professorIndex]

    if (data.nome) professor.nome = data.nome as string
    if (data.email) professor.email = data.email as string
    if (data.nascimento)
      professor.nascimento = new Date(data.nascimento.toString())

    if (data.turmas?.connect) {
      for (const con of data.turmas.connect as { id: number }[]) {
        const turma = await this.turmasRepository.buscarPorId(con.id)
        if (turma && !professor.turmas.find((t) => t.id === turma.id)) {
          professor.turmas.push({
            id: turma.id,
            nome: turma.nome,
            disciplinaId: turma.disciplinaId,
            professorId: turma.professorId,
            createdAt: turma.createdAt,
          })
          turma.professorId = professor.id
        }
      }
    }

    if (data.turmas?.disconnect) {
      for (const con of data.turmas.disconnect as { id: number }[]) {
        professor.turmas = professor.turmas.filter((t) => t.id !== con.id)
      }
    }

    this.professores[professorIndex] = professor

    return professor
  }

  async excluir(id: number): Promise<ProfessorComRelacoes> {
    const professorIndex = this.professores.findIndex((p) => p.id === id)
    if (professorIndex === -1) {
      throw new Error('Professor não encontrado')
    }

    const [professor] = this.professores.splice(professorIndex, 1)

    // Remove a referência do professor em todas as turmas
    for (const turma of professor.turmas) {
      this.turmasRepository.desregistrarProfessor(turma.id)
    }

    return professor
  }
}
