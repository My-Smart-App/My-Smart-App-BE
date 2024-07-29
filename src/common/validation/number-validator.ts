import { BaseValidator } from './base-validator';

/**
 * Class representing a number validator.
 * Extends the BaseValidator class and provides methods for number-specific validation.
 * @author NhatNHH
 * @created 2024-07-29
 */
export class NumberValidator extends BaseValidator<number> {
  constructor(value: number) {
    super(value);
  }
  public min(min: number): NumberValidator {
    return this;
  }
  public max(max: number): NumberValidator {
    return this;
  }
}
