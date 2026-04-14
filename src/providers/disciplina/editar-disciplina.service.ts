import { Injectable } from '@nestjs/common'
import { EditarDisciplinaBody } from 'src/controllers/disciplina/editar-disciplina.controller'
import { DisciplinasRepository } from 'src/database/repositories/disciplinas-repository'

@Injectable()
export class EditarDisciplinaService {
  constructor(private readonly disciplinasRepository: DisciplinasRepository) {}

  async execute(id: number, data: EditarDisciplinaBody) {
    return this.disciplinasRepository.atualizar(Number(id), data)
  }
}
