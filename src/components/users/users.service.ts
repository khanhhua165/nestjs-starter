import { UserRepository } from './repositories/user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async register({ password, ...info }: CreateUserDto) {
    const user = await this.userRepository.findOne({
      email: info.email,
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = this.userRepository.create({
      ...info,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);
    return 'User created';
  }
}
