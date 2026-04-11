import { Controller, Delete, Param } from '@nestjs/common'
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ExcluirAlunoService } from 'src/providers/aluno/excluir-aluno.service'
import { Aluno } from 'src/providers/entities/aluno'

@Controller('/alunos/:id')
@ApiTags('alunos')
export class ExcluirAlunoController {
  constructor(private readonly excluirAlunoService: ExcluirAlunoService) {}

  @Delete()
  @ApiOperation({
    summary: 'Excluir Aluno',
    description: 'Endpoint para excluir um aluno existente.',
  })
  @ApiBody({ type: Aluno })
  @ApiResponse({
    status: 201,
    type: Aluno,
    description: 'Aluno excluído com sucesso.',
  })
  async handle(@Param('id') id: number) {
    return this.excluirAlunoService.execute(id)
  }
}
