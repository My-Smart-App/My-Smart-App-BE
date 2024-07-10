import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';
import {
  IJWTPayload,
  IRequestLoginValidator,
  ResponseLogin,
  ResquestLoginDTO,
} from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { AppUser } from './app-user.schema';
import { AUTH_ERROR_MESSAGE } from 'src/common/enum/error-message';
import { PasswordEncoder } from 'src/common/password-encode/password-encoder.service';

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
    private readonly passwordEncoder: PasswordEncoder,
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

    const checkRequestLogin: IRequestLoginValidator =
      await this.validateRequestLoginPayload(appUser, requestLogin);

    if (!checkRequestLogin.isValid) {
      throw new BadRequestException(checkRequestLogin.errMsg);
    }

    const accessToken = await this.extractToken(appUser);

    return { token: accessToken, user: checkRequestLogin.data };
  }

  // In the future, we want move this function to AuthValidator when after builded the CommonValidator
  private async validateRequestLoginPayload(
    appUser: AppUser,
    requestLogin: ResquestLoginDTO,
  ): Promise<IRequestLoginValidator> {
    let isValid: boolean = true;
    let errMsg: string = '';
    let data: User | null = appUser.user;

    if (
      !appUser ||
      (await this.passwordEncoder.comparePasswords(
        requestLogin.password,
        appUser.password,
      ))
    ) {
      isValid = false;
      errMsg = AUTH_ERROR_MESSAGE.UNAUTHORIZED;
      data = null;
    }

    const result: IRequestLoginValidator = {
      isValid: isValid,
      errMsg: errMsg,
      data: data,
    };
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
