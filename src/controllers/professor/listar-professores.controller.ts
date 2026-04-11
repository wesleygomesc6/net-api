import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Professor } from 'src/providers/entities/professor'
import { ListarProfessoresService } from 'src/providers/professor/listar-professores.service'

@Controller('professores')
@ApiTags('professores')
export class ListarProfessoresController {
  constructor(
    private readonly listarProfessoresService: ListarProfessoresService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar Professores',
    description: 'Endpoint para listar todos os professores cadastrados.',
  })
  @ApiResponse({
    status: 200,
    type: [Professor],
    description: 'Lista de professores retornada com sucesso.',
  })
  handler() {
    return this.listarProfessoresService.execute()
  }
}
