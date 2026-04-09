import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { PrismaService } from "./database/prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";
import { AlunosRepository } from "./database/repositories/alunos-repository";
import { ListarAlunosService } from "./providers/aluno/listar-alunos.service";
import { ListarAlunosController } from "./controllers/aluno/listar-alunos.controller";
import { CriarAlunoController } from "./controllers/aluno/criar-aluno.controller";
import { EditarAlunoController } from "./controllers/aluno/editar-aluno.controller";
import { ExcluirAlunoController } from "./controllers/aluno/excluir-aluno.controller";
import { ExcluirAlunoService } from "./providers/aluno/excluir-aluno.service";
import { CriarAlunoService } from "./providers/aluno/criar-aluno.service";
import { EditarAlunoService } from "./providers/aluno/editar-aluno.service";
import { ProfessoresRepository } from "./database/repositories/professores-repository";
import { CriarProfessorService } from "./providers/professor/criar-professor.service";
import { EditarProfessorService } from "./providers/professor/editar-professor.service";
import { ExcluirProfessorService } from "./providers/professor/excluir-professor.service";
import { ListarProfessoresService } from "./providers/professor/listar-professores.service";
import { ExcluirProfessorController } from "./controllers/professor/excluir-professor.controller";
import { CriarProfessorController } from "./controllers/professor/criar-professor.controller";
import { EditarProfessorController } from "./controllers/professor/editar-professor.controller";
import { ListarProfessoresController } from "./controllers/professor/listar-professores.controller";

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [
    ListarAlunosController,
    CriarAlunoController,
    EditarAlunoController,
    ExcluirAlunoController,
    ListarProfessoresController,
    CriarProfessorController,
    EditarProfessorController,
    ExcluirProfessorController,
  ],
  providers: [
    PrismaService,
    AlunosRepository,
    ProfessoresRepository,
    ListarAlunosService,
    CriarAlunoService,
    EditarAlunoService,
    ExcluirAlunoService,
    ListarProfessoresService,
    CriarProfessorService,
    EditarProfessorService,
    ExcluirProfessorService,
  ],
})
export class AppModule {}
