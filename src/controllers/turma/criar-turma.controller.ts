import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import z from 'zod'
import { Turma } from 'src/providers/entities/turma'
import { CriarTurmaService } from 'src/providers/turma/criar-turma.service'

const criarTurmaBody = z.object({
  nome: z.string(),
  disciplinaId: z.coerce.number(),
  professorId: z.coerce.number(),
})

export type CriarTurmaBody = z.infer<typeof criarTurmaBody>

@Controller('/turmas')
@ApiTags('turmas')
export class CriarTurmaController {
  constructor(private readonly criarTurmaService: CriarTurmaService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar Turma',
    description: 'Endpoint para criar uma nova turma.',
  })
  @ApiBody({ type: Turma })
  @ApiResponse({
    status: 201,
    type: Turma,
    description: 'Turma criada com sucesso.',
  })
  async handle(@Body() body: CriarTurmaBody) {
    return this.criarTurmaService.execute(body)
  }
}
