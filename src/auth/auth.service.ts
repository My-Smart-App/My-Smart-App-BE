import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import { JWTPayload, ResquestLoginDTO } from './auth.dto';
import { JwtService } from '@nestjs/jwt';

/**
 * Service responsible for handling auth-related operations.
 * Provides methods to retrieve, create, update, and delete users.
 * @created 2024-07-06 Initial creation of UserService by NhatNHH
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async extractToken(
    requestLogin: ResquestLoginDTO,
  ): Promise<{ token: string; user: User }> {
    // Demo
    const user: User = (await this.userModel
      .findOne({ name: requestLogin.username })
      .lean()
      .exec()) as User;

    const payload: JWTPayload = {
      sub: user.id,
      username: requestLogin.username,
      role: 'admin',
    };

    const accessToken: string = await this.jwtService.signAsync(payload);
    return { token: accessToken, user: user };
  }
}
