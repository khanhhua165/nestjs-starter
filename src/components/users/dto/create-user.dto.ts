import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  // @ApiProperty({ required: false })
  // @IsString()
  // @MaxLength(40)
  // @IsOptional()
  // first_name?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(40)
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
