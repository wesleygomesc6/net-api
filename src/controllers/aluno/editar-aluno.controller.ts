import { Body, Controller, Param, Put } from '@nestjs/common'
import { EditarAlunoService } from 'src/providers/aluno/editar-aluno.service'
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Aluno } from 'src/providers/entities/aluno'
import z from 'zod'

const editarAlunoBody = z.object({
  nome: z.string().optional(),
  email: z.string().email().optional(),
  nascimento: z.coerce.date().optional(),
  turmas: z.array(z.object({ id: z.number(), nome: z.string() })).optional(),
})

export type EditarAlunoBody = z.infer<typeof editarAlunoBody>

@Controller('/alunos/:id')
@ApiTags('alunos')
export class EditarAlunoController {
  constructor(private readonly editarAlunoService: EditarAlunoService) {}

  @Put()
  @ApiOperation({
    summary: 'Editar Aluno',
    description: 'Endpoint para editar um aluno existente.',
  })
  @ApiBody({ type: Aluno })
  @ApiResponse({
    status: 201,
    type: Aluno,
    description: 'Aluno editado com sucesso.',
  })
  async handle(@Param('id') id: number, @Body() body: EditarAlunoBody) {
    return this.editarAlunoService.execute(id, body)
  }
}
