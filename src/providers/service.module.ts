import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { ListarAlunosService } from './aluno/listar-alunos.service'
import { CriarAlunoService } from './aluno/criar-aluno.service'
import { EditarAlunoService } from './aluno/editar-aluno.service'
import { ExcluirAlunoService } from './aluno/excluir-aluno.service'
import { CriarProfessorService } from './professor/criar-professor.service'
import { EditarProfessorService } from './professor/editar-professor.service'
import { ExcluirProfessorService } from './professor/excluir-professor.service'
import { ListarProfessoresService } from './professor/listar-professores.service'
import { ListarDisciplinasService } from './disciplina/listar-disciplinas.service'
import { CriarDisciplinaService } from './disciplina/criar-disciplina.service'
import { EditarDisciplinaService } from './disciplina/editar-disciplina.service'
import { ExcluirDisciplinaService } from './disciplina/excluir-disciplina.service'
import { ListarTurmasService } from './turma/listar-turmas.service'
import { CriarTurmaService } from './turma/criar-turma.service'
import { EditarTurmaService } from './turma/editar-turma.service'
import { ExcluirTurmaService } from './turma/excluir-turma.service'

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    ListarAlunosService,
    CriarAlunoService,
    EditarAlunoService,
    ExcluirAlunoService,
    ListarDisciplinasService,
    CriarDisciplinaService,
    EditarDisciplinaService,
    ExcluirDisciplinaService,
    ListarProfessoresService,
    CriarProfessorService,
    EditarProfessorService,
    ExcluirProfessorService,
    ListarTurmasService,
    CriarTurmaService,
    EditarTurmaService,
    ExcluirTurmaService,
  ],
  exports: [
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
    ListarTurmasService,
    CriarTurmaService,
    EditarTurmaService,
    ExcluirTurmaService,
  ],
})
export class ServiceModule {}
