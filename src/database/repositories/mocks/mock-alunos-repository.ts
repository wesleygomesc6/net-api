import { Injectable, forwardRef, Inject } from '@nestjs/common'
import { Aluno, Prisma, Turma } from 'generated/prisma/client'
import { AlunosRepository } from '../alunos-repository'
import { MockTurmasRepository } from './mock-turmas-repository'

export type AlunoComRelacoes = Aluno & {
  turmas: Turma[]
}

function alunoRaso(aluno: AlunoComRelacoes): Aluno {
  return {
    id: aluno.id,
    nome: aluno.nome,
    email: aluno.email,
    nascimento: aluno.nascimento,
    createdAt: aluno.createdAt,
  }
}

@Injectable()
export class MockAlunosRepository implements AlunosRepository {
  public alunos: AlunoComRelacoes[] = [
    {
      id: 1,
      nome: 'John Doe',
      email: 'john.doe@example.com',
      nascimento: new Date('2000-01-01'),
      createdAt: new Date(),
      turmas: [],
    },
  ]

  constructor(
    @Inject(forwardRef(() => MockTurmasRepository))
    private readonly turmasRepository: MockTurmasRepository,
  ) {}

  // Chamado pelo MockTurmasRepository para manter a relação sincronizada
  registrarTurma(alunoId: number, turma: Turma): void {
    const aluno = this.alunos.find((a) => a.id === alunoId)
    if (aluno && !aluno.turmas.find((t) => t.id === turma.id)) {
      aluno.turmas.push(turma)
    }
  }

  desregistrarTurma(alunoId: number, turmaId: number): void {
    const aluno = this.alunos.find((a) => a.id === alunoId)
    if (aluno) {
      aluno.turmas = aluno.turmas.filter((t) => t.id !== turmaId)
    }
  }

  async buscarPorId(id: number): Promise<AlunoComRelacoes | null> {
    const aluno = this.alunos.find((a) => a.id === id)
    return aluno ?? null
  }

  async listar(): Promise<AlunoComRelacoes[]> {
    return this.alunos
  }

  async criar(data: Prisma.AlunoCreateInput): Promise<AlunoComRelacoes> {
    const idAtual =
      this.alunos.length > 0 ? this.alunos[this.alunos.length - 1].id : 0

    const turmasDoAluno: Turma[] = []
    if (data.turmas?.connect) {
      for (const con of data.turmas.connect as { id: number }[]) {
        const turma = await this.turmasRepository.buscarPorId(con.id)
        if (turma) {
          // Armazena apenas os campos escalares para evitar referência circular
          turmasDoAluno.push({
            id: turma.id,
            nome: turma.nome,
            disciplinaId: turma.disciplinaId,
            professorId: turma.professorId,
            createdAt: turma.createdAt,
          })
        }
      }
    }

    const aluno: AlunoComRelacoes = {
      id: idAtual + 1,
      nome: data.nome,
      email: data.email,
      nascimento: new Date(data.nascimento as string),
      createdAt: new Date(),
      turmas: turmasDoAluno,
    }

    this.alunos.push(aluno)

    // Registra o aluno (raso) nas turmas relacionadas
    for (const turma of turmasDoAluno) {
      this.turmasRepository.registrarAluno(turma.id, alunoRaso(aluno))
    }

    return aluno
  }

  async atualizar(
    id: number,
    data: Prisma.AlunoUpdateInput,
  ): Promise<AlunoComRelacoes> {
    const alunoIndex = this.alunos.findIndex((a) => a.id === id)
    if (alunoIndex === -1) {
      throw new Error('Aluno não encontrado')
    }

    const aluno = this.alunos[alunoIndex]

    if (data.nome) aluno.nome = data.nome as string
    if (data.email) aluno.email = data.email as string
    if (data.nascimento) aluno.nascimento = new Date(data.nascimento as string)

    if (data.turmas?.connect) {
      for (const con of data.turmas.connect as { id: number }[]) {
        const turma = await this.turmasRepository.buscarPorId(con.id)
        if (turma && !aluno.turmas.find((t) => t.id === turma.id)) {
          aluno.turmas.push({
            id: turma.id,
            nome: turma.nome,
            disciplinaId: turma.disciplinaId,
            professorId: turma.professorId,
            createdAt: turma.createdAt,
          })
          this.turmasRepository.registrarAluno(turma.id, alunoRaso(aluno))
        }
      }
    }

    if (data.turmas?.disconnect) {
      for (const con of data.turmas.disconnect as { id: number }[]) {
        aluno.turmas = aluno.turmas.filter((t) => t.id !== con.id)
        this.turmasRepository.desregistrarAluno(con.id, aluno.id)
      }
    }

    this.alunos[alunoIndex] = aluno

    return aluno
  }

  async excluir(id: number): Promise<AlunoComRelacoes> {
    const alunoIndex = this.alunos.findIndex((a) => a.id === id)
    if (alunoIndex === -1) {
      throw new Error('Aluno não encontrado')
    }

    const [aluno] = this.alunos.splice(alunoIndex, 1)

    // Remove o aluno de todas as turmas em que estava
    for (const turma of aluno.turmas) {
      this.turmasRepository.desregistrarAluno(turma.id, aluno.id)
    }

    return aluno
  }
}
