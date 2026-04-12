import { Body, Controller, Post } from '@nestjs/common'
import { CriarAlunoService } from 'src/providers/aluno/criar-aluno.service'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'
import { Aluno } from 'src/providers/entities/aluno'
import z from 'zod'

const criarAlunoBody = z.object({
  nome: z.string(),
  email: z.string().email(),
  nascimento: z.coerce.date(),
})

export type CriarAlunoBody = z.infer<typeof criarAlunoBody>

@Controller('/alunos')
@ApiTags('alunos')
export class CriarAlunoController {
  constructor(private readonly criarAlunoService: CriarAlunoService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar Aluno',
    description: 'Endpoint para criar um novo aluno.',
  })
  @ApiBody({ type: Aluno })
  @ApiResponse({
    status: 201,
    type: Aluno,
    description: 'Aluno criado com sucesso.',
  })
  async handle(@Body() body: CriarAlunoBody) {
    return this.criarAlunoService.execute(body)
  }
}
