import { ApiProperty } from "@nestjs/swagger";

export class Disciplina {
  @ApiProperty({ description: "ID da disciplina", example: 1, required: false })
  id?: number;

  @ApiProperty({ description: "Nome da disciplina", example: "Matemática" })
  nome: string;

  @ApiProperty({ description: "Código da disciplina", example: "MAT001" })
  codigo: string;

  @ApiProperty({
    description: "Data de criação da disciplina",
    example: "2024-01-01T00:00:00Z",
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
    description: "Turmas da disciplina",
    example: [{ id: 1, nome: "Turma A" }],
    required: false,
  })
  turmas?: any[];
}
