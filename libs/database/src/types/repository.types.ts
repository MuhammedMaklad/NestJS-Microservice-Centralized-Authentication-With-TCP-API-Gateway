
export interface IRepository<T, CreateInput, UpdateInput, WhereInput = any> {
  create(data: CreateInput): Promise<T>;
  findById(id: string | number): Promise<T | null>;
  findMany(where?: WhereInput, options?: QueryOptions): Promise<T[]>;
  findFirst(where?: WhereInput): Promise<T | null>;
  update(id: string | number, data: UpdateInput): Promise<T>;
  delete(id: string | number): Promise<T>;
  count(where?: WhereInput): Promise<number>;
  exists(where: WhereInput): Promise<boolean>;
}

export interface QueryOptions {
  skip?: number;
  take?: number;
  orderBy?: any;
  include?: any;
  select?: any;
}

export interface PaginationResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}