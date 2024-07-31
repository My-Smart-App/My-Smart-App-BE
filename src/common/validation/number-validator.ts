import { ConditionalExecutionDecorator } from '../decorator/validation-decorator';
import { NumberErrorMessage } from '../enum/error-message';
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

  @ConditionalExecutionDecorator
  public required(): NumberValidator {
    if (this.value === undefined || this.value === null) {
      this.addErrorMessage(NumberErrorMessage.REQUIRED);
    }
    return this;
  }

  @ConditionalExecutionDecorator
  public min(min: number): NumberValidator {
    if (this.value < min) {
      this.addErrorMessage(NumberErrorMessage.MIN);
    }
    return this;
  }
  @ConditionalExecutionDecorator
  public max(max: number): NumberValidator {
    if (this.value > max) {
      this.addErrorMessage(NumberErrorMessage.MAX);
    }
    return this;
  }
}
