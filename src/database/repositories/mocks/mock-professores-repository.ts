import { Injectable } from '@nestjs/common'
import { Prisma, Professor } from 'generated/prisma/client'
import { ProfessoresRepository } from '../professores-repository'

@Injectable()
export class MockProfessoresRepository implements ProfessoresRepository {
  private professores: Professor[] = []

  async listar(): Promise<Professor[]> {
    return this.professores
  }

  async criar(data: Prisma.ProfessorCreateInput): Promise<Professor> {
    const idAtual =
      this.professores.length > 0
        ? this.professores[this.professores.length - 1].id
        : 0
    const professor: Professor = {
      id: idAtual + 1,
      nome: data.nome,
      email: data.email,
      nascimento: new Date(data.nascimento),
      createdAt: new Date(),
    }
    this.professores.push(professor)
    return professor
  }

  async atualizar(
    id: number,
    data: Prisma.ProfessorUpdateInput,
  ): Promise<Professor> {
    const professorIndex = this.professores.findIndex((p) => p.id === id)
    if (professorIndex === -1) {
      throw new Error('Professor não encontrado')
    }

    const professor = this.professores[professorIndex]

    if (data.nome) professor.nome = data.nome as string
    if (data.email) professor.email = data.email as string
    if (data.nascimento)
      professor.nascimento = new Date(data.nascimento.toString())

    this.professores[professorIndex] = professor

    return professor
  }

  async excluir(id: number): Promise<Professor> {
    const professorIndex = this.professores.findIndex((p) => p.id === id)
    if (professorIndex === -1) {
      throw new Error('Professor não encontrado')
    }
    return this.professores.splice(professorIndex, 1)[0]
  }
}
