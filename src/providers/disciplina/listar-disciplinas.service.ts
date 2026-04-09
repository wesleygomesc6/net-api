import { Injectable } from "@nestjs/common";
import { DisciplinasRepository } from "src/database/repositories/disciplinas-repository";

@Injectable()
export class ListarDisciplinasService {
  constructor(private readonly disciplinasRepository: DisciplinasRepository) {}
  async execute() {
    return await this.disciplinasRepository.listar();
  }
}
