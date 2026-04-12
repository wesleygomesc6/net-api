import { Controller, Delete, Param } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Turma } from 'src/providers/entities/turma'
import { ExcluirTurmaService } from 'src/providers/turma/excluir-turma.service'

@Controller('/turmas/:id')
@ApiTags('turmas')
export class ExcluirTurmaController {
  constructor(private readonly excluirTurmaService: ExcluirTurmaService) {}

  @Delete()
  @ApiOperation({
    summary: 'Excluir Turma',
    description: 'Endpoint para excluir uma turma existente.',
  })
  @ApiBody({ type: Turma })
  @ApiResponse({
    status: 201,
    type: Turma,
    description: 'Turma excluída com sucesso.',
  })
  async handle(@Param('id') id: number) {
    return this.excluirTurmaService.execute(id)
  }
}
