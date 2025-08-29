/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from '@prisma/client';
import { BaseRepository } from './base.repository';

export class GenericRepository<T, CreateInput, UpdateInput, WhereInput = any>
  extends BaseRepository<T, CreateInput, UpdateInput, WhereInput> {

  constructor(prisma: PrismaClient, modelName: string) {
    super(prisma, modelName);
  }

  // Add any generic methods that don't fit in base repository
  async findByField(field: string, value: any): Promise<T[]> {
    try {
      const where = { [field]: value };
      return await this.model.findMany({ where });
    } catch (error) {
      throw new Error(`Failed to find ${this.modelName}s by ${field}: ${error}`);
    }
  }

  async search(searchTerm: string, fields: string[]): Promise<T[]> {
    try {
      const orConditions = fields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }));

      return await this.model.findMany({
        where: {
          OR: orConditions
        }
      });
    } catch (error) {
      throw new Error(`Failed to search ${this.modelName}s: ${error}`);
    }
  }
}