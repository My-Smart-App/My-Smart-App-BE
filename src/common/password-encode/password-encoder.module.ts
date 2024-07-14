// crypto/crypto.module.ts
import { Module } from '@nestjs/common';
import { PasswordEncoder } from './password-encoder.service';

@Module({
  providers: [PasswordEncoder],
  exports: [PasswordEncoder],
})
export class PasswordEncodeModule {}
