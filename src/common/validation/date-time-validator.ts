import { ConditionalExecutionDecorator } from '../decorator/validation-decorator';
import { DateTimeErrorMessage } from '../enum/error-message';
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

  @ConditionalExecutionDecorator
  public isDate(): DateTimeValidator {
    const date = new Date(this.value);
    if (isNaN(date.getTime())) {
      this.addErrorMessage(DateTimeErrorMessage.INVALID_DATE);
    }
    return this;
  }

  @ConditionalExecutionDecorator
  public before(input: Date): DateTimeValidator {
    if (new Date(this.value) > new Date(input)) {
      this.addErrorMessage(DateTimeErrorMessage.INVALID_BEFORE_DATE);
    }
    return this;
  }

  @ConditionalExecutionDecorator
  public after(input: Date): DateTimeValidator {
    if (new Date(this.value) < new Date(input)) {
      this.addErrorMessage(DateTimeErrorMessage.INVALID_AFTER_DATE);
    }
    return this;
  }
}
