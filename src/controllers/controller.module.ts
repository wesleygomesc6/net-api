import { Module } from '@nestjs/common'
import { ServiceModule } from 'src/providers/service.module'
import { CriarAlunoController } from './aluno/criar-aluno.controller'
import { EditarAlunoController } from './aluno/editar-aluno.controller'
import { ExcluirAlunoController } from './aluno/excluir-aluno.controller'
import { ListarAlunosController } from './aluno/listar-alunos.controller'
import { CriarDisciplinaController } from './disciplina/criar-disciplina.controller'
import { EditarDisciplinaController } from './disciplina/editar-disciplina.controller'
import { ExcluirDisciplinaController } from './disciplina/excluir-disciplina.controller'
import { ListarDisciplinasController } from './disciplina/listar-disciplinas.controller'
import { CriarProfessorController } from './professor/criar-professor.controller'
import { EditarProfessorController } from './professor/editar-professor.controller'
import { ExcluirProfessorController } from './professor/excluir-professor.controller'
import { ListarProfessoresController } from './professor/listar-professores.controller'
import { CriarTurmaController } from './turma/criar-turma.controller'
import { EditarTurmaController } from './turma/editar-turma.controller'
import { ExcluirTurmaController } from './turma/excluir-turma.controller'
import { ListarTurmasController } from './turma/listar-turmas.controller'

@Module({
  imports: [ServiceModule],
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
    ListarTurmasController,
    CriarTurmaController,
    EditarTurmaController,
    ExcluirTurmaController,
  ],
})
export class ControllerModule {}
