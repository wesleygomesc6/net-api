import { Body, Controller, Post } from "@nestjs/common";
import { CriarProfessorService } from "src/providers/professor/criar-professor.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { Professor } from "src/providers/entities/professor";
import z from "zod";

const criarProfessorBody = z.object({
  nome: z.string(),
  email: z.string().email(),
  nascimento: z.coerce.date(),
});

export type CriarProfessorBody = z.infer<typeof criarProfessorBody>;

@Controller("/professores")
@ApiTags("professores")
export class CriarProfessorController {
  constructor(private readonly criarProfessorService: CriarProfessorService) {}

  @Post()
  @ApiOperation({
    summary: "Criar Professor",
    description: "Endpoint para criar um novo professor.",
  })
  @ApiBody({ type: Professor })
  @ApiResponse({
    status: 201,
    type: Professor,
    description: "Professor criado com sucesso.",
  })
  async handle(@Body() body: CriarProfessorBody) {
    return this.criarProfessorService.execute(body);
  }
}
