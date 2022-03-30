import { User } from './components/users/entities/user.entity';
import {
  BadRequestException,
  Module,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { db } from './config/config';
import { UsersModule } from './components/users/users.module';
const { database, host, password, port, username } = db;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host,
      port,
      username,
      database,
      password,
      synchronize: false,
      logging: process.env.NODE_ENV === 'production' ? false : true,
      entities: [User],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        validationError: { target: false, value: false },
        exceptionFactory: (validationErrors: ValidationError[] = []) => {
          return new BadRequestException(validationErrors);
        },
      }),
    },
  ],
})
export class AppModule {}
