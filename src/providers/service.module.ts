import { Module } from '@nestjs/common'
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

@Module({
  imports: [],
  controllers: [],
  providers: [
    ListarAlunosService,
    CriarAlunoService,
    EditarAlunoService,
    ExcluirAlunoService,
    ListarProfessoresService,
    CriarProfessorService,
    EditarProfessorService,
    ExcluirProfessorService,
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
  ],
})
export class ServiceModule {}
