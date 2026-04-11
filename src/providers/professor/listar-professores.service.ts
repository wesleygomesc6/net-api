import { Injectable } from '@nestjs/common'
import { ProfessoresRepository } from 'src/database/repositories/professores-repository'

@Injectable()
export class ListarProfessoresService {
  constructor(private readonly professoresRepository: ProfessoresRepository) {}
  async execute() {
    return await this.professoresRepository.listar()
  }
}
