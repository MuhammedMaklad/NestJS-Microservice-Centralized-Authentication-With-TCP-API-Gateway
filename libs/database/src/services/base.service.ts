/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { IRepository, PaginationResult, QueryOptions } from '../types/repository.types';

export abstract class BaseService<T, CreateInput, UpdateInput, WhereInput = any> {
  protected repository: IRepository<T, CreateInput, UpdateInput, WhereInput>;

  constructor(repository: IRepository<T, CreateInput, UpdateInput, WhereInput>) {
    this.repository = repository;
  }

  async create(data: CreateInput): Promise<T> {
    return await this.repository.create(data);
  }

  async findById(id: string | number): Promise<T | null> {
    return await this.repository.findById(id);
  }

  async findMany(where?: WhereInput, options?: QueryOptions): Promise<T[]> {
    return await this.repository.findMany(where, options);
  }

  async update(id: string | number, data: UpdateInput): Promise<T> {
    return await this.repository.update(id, data);
  }

  async delete(id: string | number): Promise<T> {
    return await this.repository.delete(id);
  }

  async paginate(
    where?: WhereInput,
    page: number = 1,
    limit: number = 10,
    options?: Omit<QueryOptions, 'skip' | 'take'>
  ): Promise<PaginationResult<T>> {
    if ('paginate' in this.repository) {
      return await (this.repository as any).paginate(where, page, limit, options);
    }
    throw new Error('Pagination not supported by this repository');
  }
}