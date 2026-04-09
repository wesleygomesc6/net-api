import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ListarDisciplinasService } from "src/providers/disciplina/listar-disciplinas.service";
import { Disciplina } from "src/providers/entities/disciplina";

@Controller("disciplinas")
@ApiTags("disciplinas")
export class ListarDisciplinasController {
  constructor(
    private readonly listarDisciplinasService: ListarDisciplinasService,
  ) {}

  @Get()
  @ApiOperation({
    summary: "Listar Disciplinas",
    description: "Endpoint para listar todas as disciplinas cadastrados.",
  })
  @ApiResponse({
    status: 200,
    type: [Disciplina],
    description: "Lista de disciplinas retornada com sucesso.",
  })
  handler() {
    return this.listarDisciplinasService.execute();
  }
}
