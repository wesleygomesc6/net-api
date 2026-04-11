import { Injectable } from '@nestjs/common'
import { AlunosRepository } from 'src/database/repositories/alunos-repository'

@Injectable()
export class ListarAlunosService {
  constructor(private readonly alunosRepository: AlunosRepository) {}
  async execute() {
    return await this.alunosRepository.listar()
  }
}
