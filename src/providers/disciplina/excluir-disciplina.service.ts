import { Injectable } from '@nestjs/common'
import { DisciplinasRepository } from 'src/database/repositories/disciplinas-repository'

@Injectable()
export class ExcluirDisciplinaService {
  constructor(private readonly disciplinasRepository: DisciplinasRepository) {}

  async execute(id: number) {
    return this.disciplinasRepository.excluir(Number(id))
  }
}
