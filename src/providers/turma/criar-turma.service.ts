import { Injectable } from '@nestjs/common'
import { CriarTurmaBody } from 'src/controllers/turma/criar-turma.controller'
import { TurmasRepository } from 'src/database/repositories/turmas-repository'

@Injectable()
export class CriarTurmaService {
  constructor(private readonly turmasRepository: TurmasRepository) {}

  async execute(data: CriarTurmaBody) {
    return this.turmasRepository.criar({
      nome: data.nome,
      disciplina: { connect: { id: data.disciplinaId } },
      professor: { connect: { id: data.professorId } },
    })
  }
}
