import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IJWTPayload, ResponseLogin, ResquestLoginDTO } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AppUser } from './app-user.schema';
import { Builder } from 'builder-pattern';
import { User } from '../user/user.schema';
import { AuthValidator } from '../common/validation/auth.validator';
import { PasswordEncoder } from '../common/password-encode/password-encoder.service';

/**
 * Service responsible for handling auth-related operations.
 * Provides methods to retrieve, create, update, and delete users.
 * @created 2024-07-06 Initial creation of UserService by NhatNHH
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly appUserModel: Model<AppUser>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Handle Authorization
   * @param ResquestLoginDTO
   * @returns access token and user information
   */
  public async handleLogin(
    requestLogin: ResquestLoginDTO,
  ): Promise<ResponseLogin> {
    const appUser: AppUser = (await this.appUserModel
      .findOne({ username: requestLogin.username })
      .lean()
      .exec()) as AppUser;

    const checkRequestLogin: AuthValidator =
      await this.validateRequestLoginPayload(appUser, requestLogin);

    if (checkRequestLogin.hasError) {
      throw new BadRequestException(checkRequestLogin.message);
    }

    const user = appUser.user;
    const accessToken = await this.extractToken(appUser);

    return Builder<ResponseLogin>().token(accessToken).user(user).build();
  }

  /**
   * Handle validate login payload
   * @param AppUser
   * @param ResquestLoginDTO
   * @returns AuthValidator object
   */
  private async validateRequestLoginPayload(
    appUser: AppUser,
    requestLogin: ResquestLoginDTO,
  ): Promise<AuthValidator> {
    const result = await new AuthValidator(new PasswordEncoder()).validate(
      appUser,
      requestLogin,
    );

    return result;
  }

  // In the future, we want move this function to JWTSercurityConfiguration
  public async extractToken(appUser: AppUser): Promise<string> {
    const user: User = appUser.user;
    const roles: string[] = appUser.roles.map((role) => role.name);

    const payload: IJWTPayload = {
      sub: user.id,
      username: appUser.username,
      role: roles,
    };

    const accessToken: string = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
