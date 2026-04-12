import { Injectable } from '@nestjs/common'
import { TurmasRepository } from 'src/database/repositories/turmas-repository'

@Injectable()
export class ExcluirTurmaService {
  constructor(private readonly turmasRepository: TurmasRepository) {}

  async execute(id: number) {
    return this.turmasRepository.excluir(id)
  }
}
