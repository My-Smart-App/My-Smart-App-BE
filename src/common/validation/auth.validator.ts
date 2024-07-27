import { AppUser } from 'src/auth/app-user.schema';
import { PasswordEncoder } from '../password-encode/password-encoder.service';
import { AuthErrorMessage } from '../enum/error-message';
import { BaseValidator } from './base-validator';
import { ResquestLoginDTO } from '../../auth/auth.dto';

/**
 * AuthValidator is a validator class used for authenticating user login requests.
 * @extends BaseValidator<AppUser, AuthValidator>
 * @author NhatNHH
 * @created 2024-07-07
 */
export class AuthValidator extends BaseValidator<AppUser, AuthValidator> {
  constructor(private readonly passwordEncoder: PasswordEncoder) {
    super();
  }
  /**
   * Validates the login credentials against the stored user data.
   * @param appUser
   * @param requestLogin
   * @returns This AuthValidator
   */
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
