import { Aluno, Prisma } from 'generated/prisma/client'

export abstract class AlunosRepository {
  abstract criar(data: Prisma.AlunoCreateInput): Promise<Aluno>
  abstract listar(): Promise<Aluno[]>
  abstract atualizar(id: number, data: Prisma.AlunoUpdateInput): Promise<Aluno>
  abstract excluir(id: number): Promise<Aluno>
}
