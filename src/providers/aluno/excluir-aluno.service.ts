import { Injectable } from "@nestjs/common";
import { AlunosRepository } from "src/database/repositories/alunos-repository";

@Injectable()
export class ExcluirAlunoService {
  constructor(private readonly alunosRepository: AlunosRepository) {}

  async execute(id: number) {
    return this.alunosRepository.excluir(id);
  }
}
