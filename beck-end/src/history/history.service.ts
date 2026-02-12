import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './history.entity.js';
import { Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/create-history.dto.js';

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(History)
        private historyRepository: Repository<History>
    ){}

    async findById(id: number){
        return await this.historyRepository.findOne({where: {id: id}});
    }

    async findAllByUser(userId: number){
        return await this.historyRepository.find({where: {user:{id: userId}}});
    }

    async create(createHistoryDto: CreateHistoryDto, userId: number){
        const entry = this.historyRepository.create({
            title: createHistoryDto.title,
            text: createHistoryDto.text,
            user: {id: userId}
        });
        return await this.historyRepository.save(entry);
    }

    async delete(id: number){
        return await this.historyRepository.delete(id).then(()=>{});
    }
}
