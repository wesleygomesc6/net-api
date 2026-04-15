import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from 'generated/prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Para a API rodando, usamos a URL de pooler do Supabase (porta 6543)
    const connectionString = process.env.DATABASE_URL

    // Cria um pool de conexões nativo do Postgres
    const pool = new Pool({ connectionString })

    // Conecta o pool ao adaptador do Prisma
    const adapter = new PrismaPg(pool)

    super({ adapter })
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
