import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    UserService,
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '90d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtService],
})
export class UserModule {}
