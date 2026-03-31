import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "generated/prisma/client";

@Injectable()
export class AlunosRepository {
  constructor(private prisma: PrismaService) {}

  async listar() {
    return await this.prisma.aluno.findMany();
  }

  async criar(data: Prisma.AlunoCreateInput) {
    return await this.prisma.aluno.create({ data });
  }

  async atualizar(id: number, data: Prisma.AlunoUpdateInput) {
    return await this.prisma.aluno.update({ where: { id }, data });
  }

  async excluir(id: number) {
    return await this.prisma.aluno.delete({ where: { id } });
  }
}
