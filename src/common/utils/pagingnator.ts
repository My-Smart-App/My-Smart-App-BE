declare interface IPaginator<T> {
  data: T;
  filter: Object;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pagingCounter: number;
}

export class Paginator<T> implements IPaginator<T> {
  data: T;
  filter: Object;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  pagingCounter: number;

  constructor() {}
}
