import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { HistoryService } from './history.service.js';
import { AuthGuard } from '@nestjs/passport';
import { CreateHistoryDto } from './dto/create-history.dto.js';

@Controller('history')
@UseGuards(AuthGuard('jwt'))
export class HistoryController {
    constructor(private readonly historyService: HistoryService){}

    @Get()
    findAll(@Request() req){
        return this.historyService.findAllByUser(req.user.userId);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.historyService.findById(id);
    }

    @Post()
    create(@Body(ValidationPipe) createHistoryDto: CreateHistoryDto, @Request() req){
        return this.historyService.create(createHistoryDto, req.user.userId);
    }
}
