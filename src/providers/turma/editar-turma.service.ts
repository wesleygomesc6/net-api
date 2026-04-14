import { Injectable } from '@nestjs/common'
import { EditarTurmaBody } from 'src/controllers/turma/editar-turma.controller'
import { TurmasRepository } from 'src/database/repositories/turmas-repository'

@Injectable()
export class EditarTurmaService {
  constructor(private readonly turmasRepository: TurmasRepository) {}

  async execute(id: number, data: EditarTurmaBody) {
    return this.turmasRepository.atualizar(Number(id), data)
  }
}
