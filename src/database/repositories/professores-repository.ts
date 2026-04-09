import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "generated/prisma/client";

@Injectable()
export class ProfessoresRepository {
  constructor(private prisma: PrismaService) {}

  async listar() {
    return await this.prisma.professor.findMany();
  }

  async criar(data: Prisma.ProfessorCreateInput) {
    return await this.prisma.professor.create({ data });
  }

  async atualizar(id: number, data: Prisma.ProfessorUpdateInput) {
    return await this.prisma.professor.update({ where: { id }, data });
  }

  async excluir(id: number) {
    return await this.prisma.professor.delete({ where: { id } });
  }
}
