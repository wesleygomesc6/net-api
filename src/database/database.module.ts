import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { AlunosRepository } from './repositories/alunos-repository'
import { DisciplinasRepository } from './repositories/disciplinas-repository'
import { ProfessoresRepository } from './repositories/professores-repository'
import { TurmasRepository } from './repositories/turmas-repository'
import { PrismaAlunosRepository } from './repositories/prisma/prisma-alunos-repository'
import { PrismaDisciplinasRepository } from './repositories/prisma/prisma-disciplinas-repository'
import { PrismaProfessoresRepository } from './repositories/prisma/prisma-professores-repository'
import { PrismaTurmasRepository } from './repositories/prisma/prisma-turmas-repository'

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: AlunosRepository,
      useClass: PrismaAlunosRepository,
    },
    {
      provide: DisciplinasRepository,
      useClass: PrismaDisciplinasRepository,
    },
    {
      provide: ProfessoresRepository,
      useClass: PrismaProfessoresRepository,
    },
    {
      provide: TurmasRepository,
      useClass: PrismaTurmasRepository,
    },
  ],
  exports: [
    PrismaService,
    AlunosRepository,
    DisciplinasRepository,
    ProfessoresRepository,
    TurmasRepository,
  ],
})
export class DatabaseModule {}
