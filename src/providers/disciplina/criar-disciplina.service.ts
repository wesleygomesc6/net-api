import { Injectable } from "@nestjs/common";
import { CriarDisciplinaBody } from "src/controllers/disciplina/criar-disciplina.controller";
import { DisciplinasRepository } from "src/database/repositories/disciplinas-repository";

@Injectable()
export class CriarDisciplinaService {
  constructor(private readonly disciplinasRepository: DisciplinasRepository) {}

  async execute(data: CriarDisciplinaBody) {
    return this.disciplinasRepository.criar(data);
  }
}
