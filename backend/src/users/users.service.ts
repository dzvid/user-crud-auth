import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (userAlreadyExists) {
      throw new BadRequestException('User already exists.');
    }

    const passwordHash = await hash(createUserDto.password, 8);

    await this.usersRepository.save({
      ...createUserDto,
      password: passwordHash,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findBy({ isActive: true });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id, isActive: true });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email, isActive: true });
  }

  async findUserAuth(email: string): Promise<User | null> {
    return await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where({ email, isActive: true })
      .getOne();
  }

  async update(id: number, { email, name }: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id, isActive: true });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const emailAlreadyInUse = await this.usersRepository.findOneBy({
      email,
      id: Not(user.id),
    });

    if (emailAlreadyInUse) {
      throw new BadRequestException('Email already in use by another user.');
    }

    return await this.usersRepository.save(
      Object.assign(user, { email, name }),
    );
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    await this.usersRepository.save(Object.assign(user, { isActive: false }));
  }
}
