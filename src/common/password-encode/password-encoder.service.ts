import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * PasswordEncoder is a service class responsible for encoding and comparing passwords.
 * It provides methods to hash passwords using bcrypt with a configurable number of salt rounds
 * and to compare a plain password with a hashed password to check for matches.
 * @author NhatNHH
 * @created 2024-07-06
 */
@Injectable()
export class PasswordEncoder {
  private readonly saltRounds: number;

  constructor() {
    this.saltRounds = Number(process.env.SALT_ROUNDS);
  }
  /**
   * Hashes a plain password using bcrypt.
   * @param password - The plain password to be hashed.
   * @returns the hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compares a plain password with a hashed password.
   * @param password
   * @param hashedPassword
   * @returns boolean
   */
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
