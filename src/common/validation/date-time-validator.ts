import { BaseValidator } from './base-validator';

/**
 * Class representing a datetime validator.
 * Extends the BaseValidator class and provides methods for datetime-specific validation.
 * @author NhatNHH
 * @created 2024-07-29
 */
export class DateTimeValidator extends BaseValidator<string | Date> {
  constructor(value: string | Date) {
    super(value);
  }
  public isDate(): DateTimeValidator {
    return this;
  }
  public isDateTime(): DateTimeValidator {
    return this;
  }
  public before(input: Date): DateTimeValidator {
    return this;
  }
  public after(input: Date): DateTimeValidator {
    return this;
  }
}
