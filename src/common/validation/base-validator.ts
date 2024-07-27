/**
 * IBaseValidator defines the interface for a basic validator.
 * It specifies the `validate` method that must be implemented by any class that adheres to this interface.
 * The `validate` method takes one or more values of type T and returns a result of type R or a Promise of R.
 * @interface
 */
interface IBaseValidator<T, R = boolean> {
  validate(...value: T[]): R | Promise<R>;
}

/**
 * BaseValidator provides a base implementation for validators.
 * This abstract class implements IBaseValidator and provides common properties and methods
 * to manage validation results. Subclasses must implement the `validate` method.
 * Properties:
 * - `hasError`: Indicates if validation encountered an error.
 * - `message`: Stores the validation error message, if any.
 * - `data`: Holds the validated data, or null if validation failed.
 * @abstract
 */
export abstract class BaseValidator<T, R = boolean>
  implements IBaseValidator<T, R>
{
  public hasError: boolean;
  public message: string | null;
  public data: T | null;

  constructor() {
    this.hasError = false;
    this.message = null;
    this.data = null;
  }
  abstract validate(...value: T[]): R | Promise<R>;
}
