import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoModule } from '../crypto/crypto.module';
import { PhoneConfirmation } from './entities/phone.confirmation.entity';
import { AuthModule } from '../auth/auth.module';
import { CompanyModule } from '../companies/company.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    CryptoModule,
    TypeOrmModule.forFeature([UserEntity, PhoneConfirmation]),
    CompanyModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
