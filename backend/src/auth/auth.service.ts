import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser({ email, password }: AuthDto): Promise<any> {
    const user = await this.usersService.findUserAuth(email);

    if (!user) {
      throw new UnauthorizedException('User or password invalid');
    }

    console.log(password, user.password);
    const passwordMatch = await compare(password, user.password);

    if (passwordMatch) {
      return await this.createToken(user);
    }

    throw new UnauthorizedException('User or password invalid');
  }

  async createToken(payload: User) {
    return {
      access_token: this.jwtService.sign(
        { email: payload.email },
        {
          secret: 'DUMMY_SECRET',
          expiresIn: '10m',
        },
      ),
    };
  }
}
