import { Injectable, Inject, forwardRef } from '@nestjs/common'
import {
  Aluno,
  Disciplina,
  Prisma,
  Professor,
  Turma,
} from 'generated/prisma/client'
import { TurmasRepository } from '../turmas-repository'
import { MockAlunosRepository } from './mock-alunos-repository'
import { MockDisciplinasRepository } from './mock-disciplinas-repository'
import { MockProfessoresRepository } from './mock-professores-repository'

export type TurmaComRelacoes = Turma & {
  alunos: Aluno[]
  disciplina: Disciplina
  professor: Professor
}

/** Extrai apenas os campos escalares de uma turma, sem relações aninhadas,
 *  evitando referências circulares ao registrar a turma em outros repositórios. */
function turmaRasa(turma: TurmaComRelacoes): Turma {
  return {
    id: turma.id,
    nome: turma.nome,
    disciplinaId: turma.disciplinaId,
    professorId: turma.professorId,
    createdAt: turma.createdAt,
  }
}

@Injectable()
export class MockTurmasRepository implements TurmasRepository {
  public turmas: TurmaComRelacoes[] = []

  constructor(
    @Inject(forwardRef(() => MockAlunosRepository))
    private readonly alunosRepository: MockAlunosRepository,
    private readonly disciplinasRepository: MockDisciplinasRepository,
    private readonly professoresRepository: MockProfessoresRepository,
  ) {}

  // Chamado por MockAlunosRepository para manter a relação sincronizada
  registrarAluno(turmaId: number, aluno: Aluno): void {
    const turma = this.turmas.find((t) => t.id === turmaId)
    if (turma && !turma.alunos.find((a) => a.id === aluno.id)) {
      turma.alunos.push(aluno)
    }
  }

  desregistrarAluno(turmaId: number, alunoId: number): void {
    const turma = this.turmas.find((t) => t.id === turmaId)
    if (turma) {
      turma.alunos = turma.alunos.filter((a) => a.id !== alunoId)
    }
  }

  desregistrarProfessor(turmaId: number): void {
    const turma = this.turmas.find((t) => t.id === turmaId)
    if (turma) {
      turma.professorId = null as unknown as number
    }
  }

  async buscarPorId(id: number): Promise<TurmaComRelacoes | null> {
    const turma = this.turmas.find((t) => t.id === id)
    return turma ?? null
  }

  async listar(): Promise<TurmaComRelacoes[]> {
    return this.turmas
  }

  async criar(data: Prisma.TurmaCreateInput): Promise<TurmaComRelacoes> {
    const idAtual =
      this.turmas.length > 0 ? this.turmas[this.turmas.length - 1].id : 0

    const disciplina = await this.disciplinasRepository.buscarPorId(
      (data.disciplina.connect as Disciplina).id,
    )
    if (!disciplina) {
      throw new Error('Disciplina não encontrada')
    }

    const professor = await this.professoresRepository.buscarPorId(
      (data.professor.connect as Professor).id,
    )
    if (!professor) {
      throw new Error('Professor não encontrado')
    }

    const alunos: Aluno[] = []
    if (data.alunos?.connect) {
      for (const con of data.alunos.connect as { id: number }[]) {
        const aluno = await this.alunosRepository.buscarPorId(con.id)
        if (aluno) {
          alunos.push(aluno)
        }
      }
    }

    const turma: TurmaComRelacoes = {
      id: idAtual + 1,
      nome: data.nome,
      disciplinaId: disciplina.id,
      professorId: professor.id,
      createdAt: new Date(),
      alunos,
      disciplina,
      professor,
    }

    this.turmas.push(turma)

    // Registra uma versão rasa (sem relações) para evitar referência circular
    const rasa = turmaRasa(turma)
    this.disciplinasRepository.registrarTurma(disciplina.id, rasa)
    this.professoresRepository.registrarTurma(professor.id, rasa)
    for (const aluno of alunos) {
      this.alunosRepository.registrarTurma(aluno.id, rasa)
    }

    return turma
  }

  async atualizar(
    id: number,
    data: Prisma.TurmaUpdateInput,
  ): Promise<TurmaComRelacoes> {
    const turmaIndex = this.turmas.findIndex((t) => t.id === id)
    if (turmaIndex === -1) {
      throw new Error('Turma não encontrada')
    }

    const turma = this.turmas[turmaIndex]

    if (data.nome) turma.nome = data.nome as string

    if (data.alunos?.connect) {
      for (const con of data.alunos.connect as { id: number }[]) {
        const aluno = await this.alunosRepository.buscarPorId(con.id)
        if (aluno && !turma.alunos.find((a) => a.id === aluno.id)) {
          turma.alunos.push(aluno)
          this.alunosRepository.registrarTurma(aluno.id, turmaRasa(turma))
        }
      }
    }

    if (data.alunos?.disconnect) {
      for (const con of data.alunos.disconnect as { id: number }[]) {
        turma.alunos = turma.alunos.filter((a) => a.id !== con.id)
        this.alunosRepository.desregistrarTurma(con.id, turma.id)
      }
    }

    this.turmas[turmaIndex] = turma

    return turma
  }

  async excluir(id: number): Promise<TurmaComRelacoes> {
    const turmaIndex = this.turmas.findIndex((t) => t.id === id)
    if (turmaIndex === -1) {
      throw new Error('Turma não encontrada')
    }

    const [turma] = this.turmas.splice(turmaIndex, 1)

    // Remove a turma dos repositórios relacionados
    this.disciplinasRepository.desregistrarTurma(turma.disciplinaId, turma.id)
    this.professoresRepository.desregistrarTurma(turma.professorId, turma.id)
    for (const aluno of turma.alunos) {
      this.alunosRepository.desregistrarTurma(aluno.id, turma.id)
    }

    return turma
  }
}
