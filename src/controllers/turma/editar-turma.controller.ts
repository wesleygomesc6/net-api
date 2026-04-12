import { Body, Controller, Param, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import z from 'zod'
import { Turma } from 'src/providers/entities/turma'
import { EditarTurmaService } from 'src/providers/turma/editar-turma.service'

const editarTurmaBody = z.object({
  nome: z.string().optional(),
  disciplinaId: z.coerce.number().optional(),
  professorId: z.coerce.number().optional(),
})

export type EditarTurmaBody = z.infer<typeof editarTurmaBody>

@Controller('/turmas/:id')
@ApiTags('turmas')
export class EditarTurmaController {
  constructor(private readonly editarTurmaService: EditarTurmaService) {}

  @Put()
  @ApiOperation({
    summary: 'Editar Turma',
    description: 'Endpoint para editar uma turma existente.',
  })
  @ApiBody({ type: Turma })
  @ApiResponse({
    status: 201,
    type: Turma,
    description: 'Turma editada com sucesso.',
  })
  async handle(@Param('id') id: number, @Body() body: EditarTurmaBody) {
    return this.editarTurmaService.execute(id, body)
  }
}
