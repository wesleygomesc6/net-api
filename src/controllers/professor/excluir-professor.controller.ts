import { Controller, Delete, Param } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ExcluirProfessorService } from 'src/providers/professor/excluir-professor.service'
import { Professor } from 'src/providers/entities/professor'

@Controller('/professores/:id')
@ApiTags('professores')
export class ExcluirProfessorController {
  constructor(
    private readonly excluirProfessorService: ExcluirProfessorService,
  ) {}

  @Delete()
  @ApiOperation({
    summary: 'Excluir Professor',
    description: 'Endpoint para excluir um professor existente.',
  })
  @ApiBody({ type: Professor })
  @ApiResponse({
    status: 201,
    type: Professor,
    description: 'Professor excluído com sucesso.',
  })
  async handle(@Param('id') id: number) {
    return this.excluirProfessorService.execute(id)
  }
}
