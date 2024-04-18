import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserPayload } from './decorators/user.payload.decorator';
import { UserPayloadInterface } from './interfaces/user.payload.interface';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { ResponseDecorator } from '../common/decorators/response.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ResponseDecorator(HttpStatus.OK)
  async getProfile(@UserPayload() userPayloadInterface: UserPayloadInterface) {
    return await this.usersService.getProfile(userPayloadInterface);
  }

  @Post('phone-confirm/:code')
  @ResponseDecorator(HttpStatus.OK)
  async phoneConfirm(
    @Param('code', ParseIntPipe) code: number,
    @Body('phone') phone: string,
  ) {
    return await this.usersService.confirmPhone(phone, code);
  }

  @UseGuards(JwtAuthGuard)
  @Get('phone-resend')
  @ResponseDecorator(HttpStatus.OK)
  async phoneResend(@UserPayload() user: UserPayloadInterface) {
    return await this.usersService.sendPhoneConfirmation(user.id, user.phone);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @ResponseDecorator(HttpStatus.CREATED)
  async updateProfile(
    @UserPayload() user: UserPayloadInterface,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(user.id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('phone')
  @ResponseDecorator(HttpStatus.CREATED)
  async updatePhone(
    @UserPayload() user: UserPayloadInterface,
    @Body('phone') phone: string,
  ) {
    return await this.usersService.updatePhone(user.id, phone);
  }

  @Post('registration')
  @ResponseDecorator(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
}
