import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthDto): Promise<User | null> {
    const user = await this.usersService.findUserAuth(email);

    if (!user) {
      return null;
    }

    const passwordMatch = await compare(password, user.password);

    if (passwordMatch) {
      delete user.password;
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { user: user.name, email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
