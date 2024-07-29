import { BaseValidator } from './base-validator';

/**
 * Class representing a string validator.
 * Extends the BaseValidator class and provides methods for string-specific validation.
 * @author NhatNHH
 * @created 2024-07-29
 */
export class StringValidator extends BaseValidator<String> {
  constructor(value: string) {
    super(value);
  }
  public isEmpty(): StringValidator {
    return this;
  }
  public isString(): StringValidator {
    return this;
  }
  public minLength(min: number): StringValidator {
    return this;
  }
  public maxLength(max: number): StringValidator {
    return this;
  }
  public isEmail(): StringValidator {
    return this;
  }
}
