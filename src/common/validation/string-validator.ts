import { ConditionalExecutionDecorator } from '../decorator/validation-decorator';
import { StringErrorMessage } from '../enum/error-message';
import { emailRegex } from '../regex/regex';
import { BaseValidator } from './base-validator';

/**
 * Class representing a string validator.
 * Extends the BaseValidator class and provides methods for string-specific validation.
 * @author NhatNHH
 * @created 2024-07-29
 */
export class StringValidator extends BaseValidator<string> {
  constructor(value: string) {
    super(value);
  }

  @ConditionalExecutionDecorator
  public required(): StringValidator {
    if (this.value === undefined || this.value === null) {
      this.addErrorMessage(StringErrorMessage.IS_EMPTY);
    }
    return this;
  }

  @ConditionalExecutionDecorator
  public empty(): StringValidator {
    if (this.value?.trim() === '') {
      this.addErrorMessage(StringErrorMessage.IS_EMPTY);
    }
    return this;
  }

  @ConditionalExecutionDecorator
  public isString(): StringValidator {
    if (typeof this.value !== 'string') {
      this.addErrorMessage(StringErrorMessage.NOT_STRING);
    }
    return this;
  }

  @ConditionalExecutionDecorator
  public minLength(min: number): StringValidator {
    if (this.value?.length < min) {
      this.addErrorMessage(StringErrorMessage.MIN_LENGTH);
    }
    return this;
  }

  @ConditionalExecutionDecorator
  public maxLength(max: number): StringValidator {
    if (this.value?.length > max) {
      this.addErrorMessage(StringErrorMessage.MAX_LENGTH);
    }
    return this;
  }

  @ConditionalExecutionDecorator
  public isEmail(): StringValidator {
    if (!emailRegex?.test(this.value)) {
      this.addErrorMessage(StringErrorMessage.INVALID_EMAIL);
    }
    return this;
  }
}
