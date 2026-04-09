import { Injectable } from "@nestjs/common";
import { AlunosRepository } from "src/database/repositories/alunos-repository";
import { EditarAlunoBody } from "src/controllers/aluno/editar-aluno.controller";

@Injectable()
export class EditarAlunoService {
  constructor(private readonly alunosRepository: AlunosRepository) {}

  async execute(id: number, data: EditarAlunoBody) {
    return this.alunosRepository.atualizar(id, {
      ...data,
      nascimento: new Date(data.nascimento),
    });
  }
}
