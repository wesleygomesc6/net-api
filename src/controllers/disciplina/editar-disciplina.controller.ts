import { Body, Controller, Param, Put } from "@nestjs/common";
import { EditarDisciplinaService } from "src/providers/disciplina/editar-disciplina.service";
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Disciplina } from "src/providers/entities/disciplina";
import z from "zod";

const editarDisciplinaBody = z.object({
  nome: z.string().optional(),
  codigo: z.string().optional(),
});

export type EditarDisciplinaBody = z.infer<typeof editarDisciplinaBody>;

@Controller("/disciplinas/:id")
@ApiTags("disciplinas")
export class EditarDisciplinaController {
  constructor(
    private readonly editarDisciplinaService: EditarDisciplinaService,
  ) {}

  @Put()
  @ApiOperation({
    summary: "Editar Disciplina",
    description: "Endpoint para editar uma disciplina existente.",
  })
  @ApiBody({ type: Disciplina })
  @ApiResponse({
    status: 201,
    type: Disciplina,
    description: "Disciplina editada com sucesso.",
  })
  async handle(@Param("id") id: number, @Body() body: EditarDisciplinaBody) {
    return this.editarDisciplinaService.execute(id, body);
  }
}
