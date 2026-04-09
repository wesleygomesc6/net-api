import { Injectable } from "@nestjs/common";
import { ProfessoresRepository } from "src/database/repositories/professores-repository";

@Injectable()
export class ExcluirProfessorService {
  constructor(private readonly professorsRepository: ProfessoresRepository) {}

  async execute(id: number) {
    return this.professorsRepository.excluir(id);
  }
}
