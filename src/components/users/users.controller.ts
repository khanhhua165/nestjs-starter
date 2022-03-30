import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request, @Body() body: LoginDto) {
    return this.authService.login(request.user as User);
  }
}
