import { Injectable } from '@nestjs/common'
import { CriarProfessorBody } from 'src/controllers/professor/criar-professor.controller'
import { ProfessoresRepository } from 'src/database/repositories/professores-repository'

@Injectable()
export class CriarProfessorService {
  constructor(private readonly professorsRepository: ProfessoresRepository) {}

  async execute(data: CriarProfessorBody) {
    return this.professorsRepository.criar({
      ...data,
      nascimento: new Date(data.nascimento),
      turmas: {
        connect: data.turmas?.map((turma) => ({ id: turma.id })) || [],
      },
    })
  }
}
