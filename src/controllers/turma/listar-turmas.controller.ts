import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Turma } from 'src/providers/entities/turma'
import { ListarTurmasService } from 'src/providers/turma/listar-turmas.service'

@Controller('turmas')
@ApiTags('turmas')
export class ListarTurmasController {
  constructor(private readonly listarTurmasService: ListarTurmasService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar Turmas',
    description: 'Endpoint para listar todas as turmas cadastradas.',
  })
  @ApiResponse({
    status: 200,
    type: [Turma],
    description: 'Lista de turmas retornada com sucesso.',
  })
  handler() {
    return this.listarTurmasService.execute()
  }
}
