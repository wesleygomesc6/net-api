import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ControllerModule } from './controllers/controller.module'

@Module({
  imports: [ControllerModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
