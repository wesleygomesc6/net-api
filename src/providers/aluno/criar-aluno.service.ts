import { Injectable } from "@nestjs/common";
import { AlunosRepository } from "src/database/repositories/alunos-repository";
import { CriarAlunoBody } from "src/infra/aluno/criar-aluno.controller";

@Injectable()
export class CriarAlunoService {
  constructor(private readonly alunosRepository: AlunosRepository) {}

  async execute(data: CriarAlunoBody) {
    return this.alunosRepository.criar({
      ...data,
      nascimento: new Date(data.nascimento),
    });
  }
}
