import {
  Controller,
  Delete,
  Get,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('history')
@UseGuards(AuthGuard)
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  findAll(@Request() req) {
    return this.historyService.findAllByUser(req.user.id);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.historyService.delete(id);
  }
}
