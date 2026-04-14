import { Injectable } from '@nestjs/common'
import { EditarProfessorBody } from 'src/controllers/professor/editar-professor.controller'
import { ProfessoresRepository } from 'src/database/repositories/professores-repository'

@Injectable()
export class EditarProfessorService {
  constructor(private readonly professorsRepository: ProfessoresRepository) {}

  async execute(id: number, data: EditarProfessorBody) {
    return this.professorsRepository.atualizar(Number(id), {
      ...data,
      nascimento: data.nascimento ? new Date(data.nascimento) : undefined,
      turmas: {
        set: data.turmas?.map((turma) => ({ id: turma.id })) || [],
      },
    })
  }
}
