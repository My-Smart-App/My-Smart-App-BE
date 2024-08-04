/**
 * IBaseValidator defines the interface for a basic validator.
 * It specifies the `validate` method that must be implemented by any class that adheres to this interface.
 * The `validate` method takes one or more values of type T and returns a result of type R or a Promise of R.
 * @interface
 */
interface IValidator<T, R = boolean> {
  validate(...value: T[]): R | Promise<R>;
}

/**
 * BaseValidator provides a base implementation for validators.
 * This abstract class implements IBaseValidator and provides common properties and methods
 * to manage validation results. Subclasses must implement the `validate` method.
 * @author NhatNHH
 * @created 2024-07-29
 * @abstract
 */
export abstract class Validator<T, R = boolean> implements IValidator<T, R> {
  public hasError: boolean;
  public message: string | string[] | null;
  public data: T | null;

  constructor() {
    this.hasError = false;
    this.message = null;
    this.data = null;
  }
  abstract validate(...value: T[]): R | Promise<R>;
}

/**
 * Abstract class representing a base validator.
 * This class provides a template for creating specific validators with common properties and methods.
 * @author NhatNHH
 * @created 2024-07-29
 * @abstract
 */
export abstract class BaseValidator<T> {
  public hasError: boolean;
  public message: string;
  public value: T;
  constructor(value: T) {
    this.hasError = false;
    this.value = value;
    this.message = '';
  }
  protected addErrorMessage(msg: string): void {
    this.hasError = true;
    this.message = msg;
  }
}
