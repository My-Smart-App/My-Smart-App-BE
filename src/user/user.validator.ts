import { Validator } from '../common/validation/base-validator';
import { NumberValidator } from '../common/validation/number-validator';
import { StringValidator } from '../common/validation/string-validator';
import { RequestUserCreate } from './user.dto';
import { User } from './user.schema';

export class UserValidator extends Validator<User, UserValidator> {
  constructor() {
    super();
  }
  validate(payload: RequestUserCreate): UserValidator | Promise<UserValidator> {
    const { name, age, email } = payload;

    // Validate name
    const nameValidated = new StringValidator(name)
      .required()
      .isString()
      .maxLength(150);

    // Validate age
    const ageValidated = new NumberValidator(age).required().max(120).min(0);

    // Validate email
    const emailValidated = new StringValidator(email)
      .required()
      .isString()
      .isEmail()
      .minLength(1)
      .maxLength(300);
    return this;
  }
}
