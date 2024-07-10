import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordEncoder {
  private readonly saltRounds: number;

  constructor() {
    this.saltRounds = Number(process.env.SALT_ROUNDS);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
