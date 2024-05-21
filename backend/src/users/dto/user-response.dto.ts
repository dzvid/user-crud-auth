import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UserResponseDto extends OmitType(CreateUserDto, [
  'password',
] as const) {}
