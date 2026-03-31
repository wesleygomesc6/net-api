import { Module } from "@nestjs/common";
import { ListarAlunosService } from "./aluno/listar.service";
import { CriarAlunoService } from "./aluno/criar-aluno.service";
import { EditarAlunoService } from "./aluno/editar-aluno.service";
import { ExcluirAlunoService } from "./aluno/excluir-aluno.service";

@Module({
  imports: [],
  controllers: [],
  providers: [
    ListarAlunosService,
    CriarAlunoService,
    EditarAlunoService,
    ExcluirAlunoService,
  ],
  exports: [
    ListarAlunosService,
    CriarAlunoService,
    EditarAlunoService,
    ExcluirAlunoService,
  ],
})
export class ServiceModule {}
