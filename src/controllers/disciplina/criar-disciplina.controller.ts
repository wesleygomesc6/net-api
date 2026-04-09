import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import z from "zod";
import { Disciplina } from "src/providers/entities/disciplina";
import { CriarDisciplinaService } from "src/providers/disciplina/criar-disciplina.service";

const criarDisciplinaBody = z.object({
  nome: z.string(),
  codigo: z.string(),
});

export type CriarDisciplinaBody = z.infer<typeof criarDisciplinaBody>;

@Controller("/disciplinas")
@ApiTags("disciplinas")
export class CriarDisciplinaController {
  constructor(
    private readonly criarDisciplinaService: CriarDisciplinaService,
  ) {}

  @Post()
  @ApiOperation({
    summary: "Criar Disciplina",
    description: "Endpoint para criar uma nova disciplina.",
  })
  @ApiBody({ type: Disciplina })
  @ApiResponse({
    status: 201,
    type: Disciplina,
    description: "Disciplina criada com sucesso.",
  })
  async handle(@Body() body: CriarDisciplinaBody) {
    return this.criarDisciplinaService.execute(body);
  }
}
