import { Module } from '@nestjs/common';
import { HistoryService } from './history.service.js';
import { HistoryController } from './history.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './history.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  providers: [HistoryService],
  controllers: [HistoryController]
})
export class HistoryModule {}
