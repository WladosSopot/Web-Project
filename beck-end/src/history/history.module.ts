import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './history.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([History]), AuthModule],
  providers: [HistoryService],
  controllers: [HistoryController],
  exports: [HistoryService],
})
export class HistoryModule {}
