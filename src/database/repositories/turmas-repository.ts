import { Prisma, Turma } from 'generated/prisma/client'

export abstract class TurmasRepository {
  abstract criar(data: Prisma.TurmaCreateInput): Promise<Turma>
  abstract listar(): Promise<Turma[]>
  abstract atualizar(id: number, data: Prisma.TurmaUpdateInput): Promise<Turma>
  abstract excluir(id: number): Promise<Turma>
}
