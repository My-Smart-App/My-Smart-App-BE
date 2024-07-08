export class MSAResponse<T> {
  constructor(
    public readonly status: number | string | Enumerator,
    public readonly message: string,
    public readonly data: T,
  ) {}
}
