import { ApiProperty } from "@nestjs/swagger";

export class Aluno {
  @ApiProperty({ description: "ID do aluno", example: 1, required: false })
  id?: number;

  @ApiProperty({ description: "Nome do aluno", example: "João Silva" })
  nome: string;
  @ApiProperty({
    description: "Email do aluno",
    example: "joao.silva@example.com",
  })
  email: string;
  @ApiProperty({
    description: "Data de nascimento do aluno",
    example: "2000-01-01",
  })
  nascimento: Date;
  @ApiProperty({
    description: "Data de criação do aluno",
    example: "2024-01-01T00:00:00Z",
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
    description: "Turmas do aluno",
    example: [{ id: 1, nome: "Turma A" }],
    required: false,
  })
  turmas?: any[];
}
