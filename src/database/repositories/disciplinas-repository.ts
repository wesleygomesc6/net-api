import { Disciplina, Prisma } from 'generated/prisma/client'

export abstract class DisciplinasRepository {
  abstract criar(data: Prisma.DisciplinaCreateInput): Promise<Disciplina>
  abstract listar(): Promise<Disciplina[]>
  abstract atualizar(
    id: number,
    data: Prisma.DisciplinaUpdateInput,
  ): Promise<Disciplina>
  abstract excluir(id: number): Promise<Disciplina>
}
