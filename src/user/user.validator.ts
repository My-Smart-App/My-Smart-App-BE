import { Validator } from '../common/validation/base-validator';
import { RequestUserCreate } from './user.dto';
import { User } from './user.schema';

export class UserValidator extends Validator<User, UserValidator> {
  constructor() {
    super();
  }
  validate(payload: RequestUserCreate): UserValidator | Promise<UserValidator> {
    const { name, age, email, description } = payload;

    return this;
  }
}
