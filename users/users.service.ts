import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from '../crypto/crypto.service';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateUserDto } from './dto/create.user.dto';
import { PhoneConfirmation } from './entities/phone.confirmation.entity';
import { AuthService } from '../auth/auth.service';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserPayloadInterface } from './interfaces/user.payload.interface';
import { CompanyService } from '../companies/services/company.service';

@Injectable()
export class UsersService extends TypeOrmCrudService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(PhoneConfirmation)
    private readonly phoneConfirmationRepository: Repository<PhoneConfirmation>,
    private readonly authService: AuthService,
    private readonly cryptoService: CryptoService,
    private readonly companyService: CompanyService,
  ) {
    super(userRepository);
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    let user = await this.findOneById(userId);
    user = Object.assign(user, updateUserDto);
    // TODO: Отправить письмо с уведомлением
    return await this.userRepository.save(user);
  }

  async updatePhone(userId: string, phone: string): Promise<UserEntity> {
    const user = await this.findOneById(userId);
    user.phone = phone;
    // TODO: Отправить sms с подтверждением
    return await this.userRepository.save(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<PhoneConfirmation> {
    // TODO: check phone => validation constraint
    const checkUser = await this.findOneByPhone(createUserDto.phone);
    if (checkUser) {
      throw new ConflictException('Укажите другой телефон.');
    }
    try {
      const { id, ...data } = Object.assign(new UserEntity(), createUserDto);
      const user = await this.userRepository.save(data);
      return await this.sendPhoneConfirmation(user.id, user.phone);
    } catch (e) {
      throw new BadRequestException('Ошибка', e.message);
    }
  }

  async sendPhoneConfirmation(
    userId: string,
    phone: string,
  ): Promise<PhoneConfirmation> {
    try {
      let confirmation = await this.phoneConfirmationRepository.findOne({
        where: {
          userId,
        },
      });
      if (!confirmation) {
        confirmation = new PhoneConfirmation();
        confirmation.userId = userId;
        confirmation.phone = phone;
      }
      confirmation.code = this.cryptoService.generateMobileCode();
      console.log(`PHONE CODE: ${confirmation.code}`);
      return await this.phoneConfirmationRepository.save(confirmation);
    } catch (e) {
      throw new BadRequestException(
        'Не удалось отправить код для подтверждения телефона!',
        e.message,
      );
    }
  }

  async confirmPhone(
    phone: string,
    code: number,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const confirmation = await this.phoneConfirmationRepository.findOne({
      where: {
        code,
        phone: phone,
      },
      relations: ['user'],
    });
    if (!confirmation) {
      throw new NotFoundException('Ошибка подтверждения телефона!');
    }
    confirmation.user.phoneConfirm = true;
    confirmation.user.active = true;
    await this.userRepository.save(confirmation.user);
    await this.phoneConfirmationRepository.remove(confirmation);
    return await this.authService.login(confirmation.user);
  }

  async findOneById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async getProfile(userPayloadInterface: UserPayloadInterface) {
    const user = await this.userRepository.findOne({
      where: {
        id: userPayloadInterface.id,
      },
    });
    if (userPayloadInterface.companyId) {
      const { owner, ...company } =
              await this.companyService.findCompanyByOwner(user);

      return {
        ...user,
        currentCompany: company,
      };
    } else {
      return {
        ...user,
        currentCompany: null,
      };
    }
  }

  async findOneByPhone(phone: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        phone,
      },
    });
  }
}
