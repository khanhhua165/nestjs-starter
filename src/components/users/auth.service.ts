import { UserRepository } from './repositories/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UsersService } from './users.service';
import { UserStatus } from './constants/user-status.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }

    const isMatched = await argon2.verify(user.password, password);
    if (!isMatched) {
      return null;
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new UnauthorizedException('User is inactive');
    }
    return user;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    await this.userRepository.save(user);
    const editedUser = {
      ...user,
      password: undefined,
    };
    return { token: this.jwtService.sign(payload), user: editedUser };
  }
}
