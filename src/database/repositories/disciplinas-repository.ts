import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "generated/prisma/client";

@Injectable()
export class DisciplinasRepository {
  constructor(private prisma: PrismaService) {}

  async listar() {
    return await this.prisma.disciplina.findMany();
  }

  async criar(data: Prisma.DisciplinaCreateInput) {
    return await this.prisma.disciplina.create({ data });
  }

  async atualizar(id: number, data: Prisma.DisciplinaUpdateInput) {
    return await this.prisma.disciplina.update({ where: { id }, data });
  }

  async excluir(id: number) {
    return await this.prisma.disciplina.delete({ where: { id } });
  }
}
