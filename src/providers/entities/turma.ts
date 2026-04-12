import { ApiProperty } from '@nestjs/swagger'

export class Turma {
  @ApiProperty({ description: 'ID da turma', example: 1, required: false })
  id?: number

  @ApiProperty({ description: 'Nome da turma', example: 'Turma A' })
  nome: string

  @ApiProperty({ description: 'ID da disciplina', example: 1 })
  disciplinaId: number

  @ApiProperty({ description: 'ID do professor', example: 1 })
  professorId: number

  @ApiProperty({
    description: 'Data de criação da turma',
    example: '2024-01-01T00:00:00Z',
    required: false,
  })
  createdAt?: Date

  @ApiProperty({
    description: 'Alunos da turma',
    example: [{ id: 1, nome: 'João Silva' }],
    required: false,
  })
  alunos?: any[]

  @ApiProperty({
    description: 'Disciplina da turma',
    example: { id: 1, nome: 'Matemática' },
    required: false,
  })
  disciplina?: any

  @ApiProperty({
    description: 'Professor da turma',
    example: { id: 1, nome: 'Dr. João Silva' },
    required: false,
  })
  professor?: any
}
