interface IBaseValidator<T, R = boolean> {
  validate(...value: T[]): R | Promise<R>;
}

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
