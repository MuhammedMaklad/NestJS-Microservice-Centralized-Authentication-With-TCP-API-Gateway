/* eslint-disable @typescript-eslint/no-unsafe-return */
import { PrismaClient } from '@prisma/client';
import { GenericRepository } from '../repositories/generic.repository';

export class RepositoryFactory {
  private static repositories: Map<string, any> = new Map();

  static createRepository<T, CreateInput, UpdateInput, WhereInput = any>(
    prisma: PrismaClient,
    modelName: string
  ): GenericRepository<T, CreateInput, UpdateInput, WhereInput> {
    const key = modelName.toLowerCase();

    if (!this.repositories.has(key)) {
      this.repositories.set(
        key,
        new GenericRepository<T, CreateInput, UpdateInput, WhereInput>(prisma, modelName)
      );
    }

    return this.repositories.get(key);
  }

  static clearCache(): void {
    this.repositories.clear();
  }
}