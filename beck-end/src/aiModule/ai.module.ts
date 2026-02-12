import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { ConfigModule } from '@nestjs/config';
import { HistoryModule } from '../history/history.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, HistoryModule, AuthModule],
  providers: [AiService],
  controllers: [AiController],
  exports: [AiService],
})
export class AiModule {}
