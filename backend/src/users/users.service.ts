import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findBy({ isActive: true });
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id, isActive: true });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = this.usersRepository.findOneBy({ id, isActive: true });
    return this.usersRepository.save(Object.assign(user, updateUserDto));
  }

  async remove(id: number): Promise<void> {
    const user = this.usersRepository.findOneBy({ id });
    this.usersRepository.save(Object.assign(user, { isActive: false }));
  }
}
