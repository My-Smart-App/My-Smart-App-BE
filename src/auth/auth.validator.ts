import { PasswordEncoder } from '../common/password-encode/password-encoder.service';
import { AuthErrorMessage } from '../common/enum/error-message';
import { BaseValidator, Validator } from '../common/validation/base-validator';
import { ResquestLoginDTO } from './auth.dto';
import { AppUser } from './app-user.schema';

/**
 * AuthValidator is a validator class used for authenticating user login requests.
 * @extends BaseValidator
 * @author NhatNHH
 * @created 2024-07-07
 */
export class AuthValidator extends Validator<AppUser, AuthValidator> {
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
