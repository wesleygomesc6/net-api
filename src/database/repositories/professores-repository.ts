import { Professor, Prisma } from 'generated/prisma/client'

export abstract class ProfessoresRepository {
  abstract criar(data: Prisma.ProfessorCreateInput): Promise<Professor>
  abstract listar(): Promise<Professor[]>
  abstract atualizar(
    id: number,
    data: Prisma.ProfessorUpdateInput,
  ): Promise<Professor>
  abstract excluir(id: number): Promise<Professor>
}
