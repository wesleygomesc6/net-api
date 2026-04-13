# NET API

API desenvolvida com NestJS para gerenciamento de:

- Alunos
- Professores
- Disciplinas
- Turmas

O projeto segue uma arquitetura em camadas com controllers, services e repositories, permitindo alternar facilmente entre persistencia mockada (em memoria) e persistencia real com Prisma.

## Tecnologias

- Node.js
- NestJS
- Prisma ORM
- MySQL
- Zod (validacao de payload)
- Swagger (documentacao da API)

## Funcionalidades

Cada recurso possui CRUD completo:

- Alunos: criar, listar, editar e excluir
- Professores: criar, listar, editar e excluir
- Disciplinas: criar, listar, editar e excluir
- Turmas: criar, listar, editar e excluir

## Documentacao Swagger

Com a aplicacao em execucao, acesse:

- http://localhost:3334/api

## Estrutura (resumo)

```text
src/
  controllers/   # Camada HTTP
  providers/     # Regras de negocio (services + entities)
  database/      # Prisma + repositories (mocks e reais)
prisma/
  schema.prisma
  migrations/
```

## Requisitos

- Node.js 20+
- npm
- DATABASE_URL configurada no ambiente (para uso com Prisma real)

## Instalacao

```bash
npm install
```

## Executando o projeto

```bash
# desenvolvimento
npm run start:dev

# modo padrao
npm run start

# producao
npm run start:prod
```

## Prisma e banco de dados

1. Configure a variavel de ambiente DATABASE_URL.
2. Ajuste o schema em prisma/schema.prisma, se necessario.
3. Rode as migracoes:

```bash
npx prisma migrate deply # aplicar as migrations existentes
npx prisma migrate dev # criar nova migration
```

4. Gere o client do Prisma (se necessario):

```bash
npx prisma generate
```

## Repositorios mockados e reais

O projeto possui duas implementacoes para cada repositorio:

- Mockados (em memoria):
  - src/database/repositories/mocks/mock-alunos-repository.ts
  - src/database/repositories/mocks/mock-professores-repository.ts
  - src/database/repositories/mocks/mock-disciplinas-repository.ts
  - src/database/repositories/mocks/mock-turmas-repository.ts
- Reais (Prisma):
  - src/database/repositories/prisma/prisma-alunos-repository.ts
  - src/database/repositories/prisma/prisma-professores-repository.ts
  - src/database/repositories/prisma/prisma-disciplinas-repository.ts
  - src/database/repositories/prisma/prisma-turmas-repository.ts

Atualmente, o modulo de banco esta configurado para usar os repositorios mockados em src/database/database.module.ts.

### Como alternar para repositorios reais (Prisma)

No arquivo src/database/database.module.ts, troque os providers de cada repositorio de Mock*Repository para Prisma*Repository.

Exemplo para alunos:

```ts
{
  provide: AlunosRepository,
  useClass: PrismaAlunosRepository,
}
```

Repita o mesmo para disciplinas, professores e turmas.

## Licenca

Projeto licenciado sob os termos definidos em LICENSE.
