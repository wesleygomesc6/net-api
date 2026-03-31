import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { PrismaService } from "./database/prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";
import { AlunosRepository } from "./database/repositories/alunos-repository";
import { ListarAlunosService } from "./providers/aluno/listar.service";
import { ListarAlunosController } from "./infra/aluno/listar.controller";
import { CriarAlunoController } from "./infra/aluno/criar-aluno.controller";
import { EditarAlunoController } from "./infra/aluno/editar-aluno.controller";
import { ExcluirAlunoController } from "./infra/aluno/excluir-aluno.controller";
import { ExcluirAlunoService } from "./providers/aluno/excluir-aluno.service";
import { CriarAlunoService } from "./providers/aluno/criar-aluno.service";
import { EditarAlunoService } from "./providers/aluno/editar-aluno.service";

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [
    ListarAlunosController,
    CriarAlunoController,
    EditarAlunoController,
    ExcluirAlunoController,
  ],
  providers: [
    PrismaService,
    AlunosRepository,
    ListarAlunosService,
    CriarAlunoService,
    EditarAlunoService,
    ExcluirAlunoService,
  ],
})
export class AppModule {}
