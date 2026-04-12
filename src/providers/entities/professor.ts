import { ApiProperty } from '@nestjs/swagger'

export class Professor {
  @ApiProperty({ description: 'ID do professor', example: 1, required: false })
  id?: number

  @ApiProperty({ description: 'Nome do professor', example: 'Dr. João Silva' })
  nome: string
  @ApiProperty({
    description: 'Email do professor',
    example: 'joao.silva@example.com',
  })
  email: string
  @ApiProperty({
    description: 'Data de nascimento do professor',
    example: '2000-01-01',
  })
  nascimento: Date
  @ApiProperty({
    description: 'Data de criação do professor',
    example: '2024-01-01T00:00:00Z',
    required: false,
  })
  createdAt?: Date

  @ApiProperty({
    description: 'Turmas do professor',
    example: [{ id: 1, nome: 'Turma A' }],
    required: false,
  })
  turmas?: any[]
}
