import { IsEmail, IsMobilePhone, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  firstname: string;

  @ApiProperty()
  @IsMobilePhone('ru-RU')
  phone: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @MinLength(8)
  @IsOptional()
  password: string;
}
