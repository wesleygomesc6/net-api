import { Body, Controller, Param, Put } from '@nestjs/common'
import { EditarProfessorService } from 'src/providers/professor/editar-professor.service'
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Professor } from 'src/providers/entities/professor'
import z from 'zod'

const editarProfessorBody = z.object({
  nome: z.string().optional(),
  email: z.string().email().optional(),
  nascimento: z.coerce.date().optional(),
})

export type EditarProfessorBody = z.infer<typeof editarProfessorBody>

@Controller('/professores/:id')
@ApiTags('professores')
export class EditarProfessorController {
  constructor(
    private readonly editarProfessorService: EditarProfessorService,
  ) {}

  @Put()
  @ApiOperation({
    summary: 'Editar Professor',
    description: 'Endpoint para editar um professor existente.',
  })
  @ApiBody({ type: Professor })
  @ApiResponse({
    status: 201,
    type: Professor,
    description: 'Professor editado com sucesso.',
  })
  async handle(@Param('id') id: number, @Body() body: EditarProfessorBody) {
    return this.editarProfessorService.execute(id, body)
  }
}
