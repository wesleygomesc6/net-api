import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { PrismaService } from './database/prisma/prisma.service'
import { ConfigModule } from '@nestjs/config'
import { ListarAlunosService } from './providers/aluno/listar-alunos.service'
import { ListarAlunosController } from './controllers/aluno/listar-alunos.controller'
import { CriarAlunoController } from './controllers/aluno/criar-aluno.controller'
import { EditarAlunoController } from './controllers/aluno/editar-aluno.controller'
import { ExcluirAlunoController } from './controllers/aluno/excluir-aluno.controller'
import { ExcluirAlunoService } from './providers/aluno/excluir-aluno.service'
import { CriarAlunoService } from './providers/aluno/criar-aluno.service'
import { EditarAlunoService } from './providers/aluno/editar-aluno.service'
import { CriarProfessorService } from './providers/professor/criar-professor.service'
import { EditarProfessorService } from './providers/professor/editar-professor.service'
import { ExcluirProfessorService } from './providers/professor/excluir-professor.service'
import { ListarProfessoresService } from './providers/professor/listar-professores.service'
import { ExcluirProfessorController } from './controllers/professor/excluir-professor.controller'
import { CriarProfessorController } from './controllers/professor/criar-professor.controller'
import { EditarProfessorController } from './controllers/professor/editar-professor.controller'
import { ListarProfessoresController } from './controllers/professor/listar-professores.controller'
import { CriarDisciplinaController } from './controllers/disciplina/criar-disciplina.controller'
import { EditarDisciplinaController } from './controllers/disciplina/editar-disciplina.controller'
import { ExcluirDisciplinaController } from './controllers/disciplina/excluir-disciplina.controller'
import { ListarDisciplinasController } from './controllers/disciplina/listar-disciplinas.controller'
import { CriarDisciplinaService } from './providers/disciplina/criar-disciplina.service'
import { EditarDisciplinaService } from './providers/disciplina/editar-disciplina.service'
import { ExcluirDisciplinaService } from './providers/disciplina/excluir-disciplina.service'
import { ListarDisciplinasService } from './providers/disciplina/listar-disciplinas.service'

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
    ListarDisciplinasController,
    CriarDisciplinaController,
    EditarDisciplinaController,
    ExcluirDisciplinaController,
  ],
  providers: [
    PrismaService,
    ListarAlunosService,
    CriarAlunoService,
    EditarAlunoService,
    ExcluirAlunoService,
    ListarProfessoresService,
    CriarProfessorService,
    EditarProfessorService,
    ExcluirProfessorService,
    ListarDisciplinasService,
    CriarDisciplinaService,
    EditarDisciplinaService,
    ExcluirDisciplinaService,
  ],
})
export class AppModule {}
