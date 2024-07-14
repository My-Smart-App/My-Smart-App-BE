import { AppUser } from 'src/auth/app-user.schema';
import { ResquestLoginDTO } from 'src/auth/auth.dto';
import { PasswordEncoder } from '../password-encode/password-encoder.service';
import { AuthErrorMessage } from '../enum/error-message';
import { BaseValidator } from './base-validator';

export class AuthValidator extends BaseValidator<AppUser, AuthValidator> {
  constructor(private readonly passwordEncoder: PasswordEncoder) {
    super();
  }
  public async validate(
    appUser: AppUser,
    requestLogin: ResquestLoginDTO,
  ): Promise<AuthValidator> {
    if (
      !appUser ||
      (await this.passwordEncoder.comparePasswords(
        requestLogin.password,
        appUser.password,
      ))
    ) {
      this.hasError = true;
      this.message = AuthErrorMessage.UNAUTHORIZED;
      this.data = null;
    } else {
      this.hasError = false;
      this.message = null;
      this.data = appUser;
    }

    return this;
  }
}
