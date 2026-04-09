import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ListarAlunosService } from "src/providers/aluno/listar-alunos.service";
import { Aluno } from "src/providers/entities/aluno";

@Controller("alunos")
@ApiTags("alunos")
export class ListarAlunosController {
  constructor(private readonly listarAlunosService: ListarAlunosService) {}

  @Get()
  @ApiOperation({
    summary: "Listar Alunos",
    description: "Endpoint para listar todos os alunos cadastrados.",
  })
  @ApiResponse({
    status: 200,
    type: [Aluno],
    description: "Lista de alunos retornada com sucesso.",
  })
  handler() {
    return this.listarAlunosService.execute();
  }
}
