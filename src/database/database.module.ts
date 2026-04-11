import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { AlunosRepository } from './repositories/alunos-repository'
import { DisciplinasRepository } from './repositories/disciplinas-repository'
import { MockAlunosRepository } from './repositories/mocks/mock-alunos-repository'
import { MockDisciplinasRepository } from './repositories/mocks/mock-disciplinas-repository'
import { MockProfessoresRepository } from './repositories/mocks/mock-professores-repository'
import { ProfessoresRepository } from './repositories/professores-repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: AlunosRepository,
      useClass: MockAlunosRepository,
    },
    {
      provide: DisciplinasRepository,
      useClass: MockDisciplinasRepository,
    },
    {
      provide: ProfessoresRepository,
      useClass: MockProfessoresRepository,
    },
  ],
  exports: [
    PrismaService,
    AlunosRepository,
    DisciplinasRepository,
    ProfessoresRepository,
  ],
})
export class DatabaseModule {}
