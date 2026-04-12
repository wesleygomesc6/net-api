import { Injectable } from '@nestjs/common'
import { Aluno, Prisma } from 'generated/prisma/client'
import { AlunosRepository } from '../alunos-repository'

@Injectable()
export class MockAlunosRepository implements AlunosRepository {
  private alunos: Aluno[] = []

  async listar(): Promise<Aluno[]> {
    return this.alunos
  }

  async criar(data: Prisma.AlunoCreateInput): Promise<Aluno> {
    const idAtual =
      this.alunos.length > 0 ? this.alunos[this.alunos.length - 1].id : 0
    const aluno: Aluno = {
      id: idAtual + 1,
      nome: data.nome,
      email: data.email,
      nascimento: new Date(data.nascimento),
      createdAt: new Date(),
    }
    this.alunos.push(aluno)
    return aluno
  }

  async atualizar(id: number, data: Prisma.AlunoUpdateInput): Promise<Aluno> {
    const alunoIndex = this.alunos.findIndex((a) => a.id === id)
    if (alunoIndex === -1) {
      throw new Error('Aluno não encontrado')
    }

    const aluno = this.alunos[alunoIndex]

    // Atualiza os campos do aluno com os novos dados
    if (data.nome) aluno.nome = data.nome as string
    if (data.email) aluno.email = data.email as string
    if (data.nascimento) aluno.nascimento = new Date(data.nascimento as string)

    this.alunos[alunoIndex] = aluno

    return aluno
  }

  async excluir(id: number): Promise<Aluno> {
    const alunoIndex = this.alunos.findIndex((a) => a.id === id)
    if (alunoIndex === -1) {
      throw new Error('Aluno não encontrado')
    }
    return this.alunos.splice(alunoIndex, 1)[0]
  }
}
