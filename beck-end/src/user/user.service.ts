import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({
      where: { username: username },
      select: ['id', 'username', 'password'],
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }
}
