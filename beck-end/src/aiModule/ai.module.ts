import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module.js';
import { AiController } from './ai.controller.js';
import { AiService } from './ai.service.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), UserModule],
  providers: [AiService],
  controllers: [AiController],
  exports: [AiService],
})
export class AiModule {}
