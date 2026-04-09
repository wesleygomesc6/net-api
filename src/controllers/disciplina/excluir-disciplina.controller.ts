import { Controller, Delete, Param } from "@nestjs/common";
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ExcluirDisciplinaService } from "src/providers/disciplina/excluir-disciplina.service";
import { Disciplina } from "src/providers/entities/disciplina";

@Controller("/disciplinas/:id")
@ApiTags("disciplinas")
export class ExcluirDisciplinaController {
  constructor(
    private readonly excluirDisciplinaService: ExcluirDisciplinaService,
  ) {}

  @Delete()
  @ApiOperation({
    summary: "Excluir Disciplina",
    description: "Endpoint para excluir uma disciplina existente.",
  })
  @ApiBody({ type: Disciplina })
  @ApiResponse({
    status: 201,
    type: Disciplina,
    description: "Disciplina excluída com sucesso.",
  })
  async handle(@Param("id") id: number) {
    return this.excluirDisciplinaService.execute(id);
  }
}
