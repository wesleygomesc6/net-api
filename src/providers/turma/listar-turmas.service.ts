import { Injectable } from '@nestjs/common'
import { TurmasRepository } from 'src/database/repositories/turmas-repository'

@Injectable()
export class ListarTurmasService {
  constructor(private readonly turmasRepository: TurmasRepository) {}

  async execute() {
    return await this.turmasRepository.listar()
  }
}
