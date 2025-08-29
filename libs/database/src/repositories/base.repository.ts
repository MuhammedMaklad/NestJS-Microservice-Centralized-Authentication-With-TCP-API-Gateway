/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { PrismaClient } from "@prisma/client";
import { IRepository, QueryOptions, PaginationResult } from "../types/repository.types";

export abstract class BaseRepository<T, CreateInput, UpdateInput, WhereInput = any>
  implements IRepository<T, CreateInput, UpdateInput, WhereInput> {

  protected prisma: PrismaClient;
  protected modelName: string;

  constructor(prisma: PrismaClient, modelName: string) {
    this.prisma = prisma;
    this.modelName = modelName;
  }

  protected get model() {
    return (this.prisma as any)[this.modelName];
  }

  async create(data: CreateInput): Promise<T> {
    try {
      return await this.model.create({ data });
    } catch (error) {
      throw new Error(`Failed to create ${this.modelName}: ${error}`);
    }
  }

  async findById(id: string | number): Promise<T | null> {
    try {
      return await this.model.findUnique({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to find ${this.modelName} by id: ${error}`);
    }
  }

  async findMany(where?: WhereInput, options?: QueryOptions): Promise<T[]> {
    try {
      const query: any = {};

      if (where) query.where = where;
      if (options?.skip) query.skip = options.skip;
      if (options?.take) query.take = options.take;
      if (options?.orderBy) query.orderBy = options.orderBy;
      if (options?.include) query.include = options.include;
      if (options?.select) query.select = options.select;

      return await this.model.findMany(query);
    } catch (error) {
      throw new Error(`Failed to find ${this.modelName}s: ${error}`);
    }
  }

  async findFirst(where?: WhereInput): Promise<T | null> {
    try {
      return await this.model.findFirst({ where });
    } catch (error) {
      throw new Error(`Failed to find first ${this.modelName}: ${error}`);
    }
  }

  async update(id: string | number, data: UpdateInput): Promise<T> {
    try {
      return await this.model.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(`Failed to update ${this.modelName}: ${error}`);
    }
  }

  async delete(id: string | number): Promise<T> {
    try {
      return await this.model.delete({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to delete ${this.modelName}: ${error}`);
    }
  }

  async count(where?: WhereInput): Promise<number> {
    try {
      return await this.model.count({ where });
    } catch (error) {
      throw new Error(`Failed to count ${this.modelName}s: ${error}`);
    }
  }

  async exists(where: WhereInput): Promise<boolean> {
    try {
      const record = await this.model.findFirst({ where });
      return !!record;
    } catch (error) {
      throw new Error(`Failed to check if ${this.modelName} exists: ${error}`);
    }
  }

  async paginate(
    where?: WhereInput,
    page: number = 1,
    limit: number = 10,
    options?: Omit<QueryOptions, 'skip' | 'take'>
  ): Promise<PaginationResult<T>> {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.findMany(where, { ...options, skip, take: limit }),
        this.count(where),
      ]);

      return {
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error(`Failed to paginate ${this.modelName}s: ${error}`);
    }
  }

  async upsert(
    where: WhereInput,
    create: CreateInput,
    update: UpdateInput
  ): Promise<T> {
    try {
      return await this.model.upsert({
        where,
        create,
        update,
      });
    } catch (error) {
      throw new Error(`Failed to upsert ${this.modelName}: ${error}`);
    }
  }

  async bulkCreate(data: CreateInput[]): Promise<{ count: number }> {
    try {
      return await this.model.createMany({ data });
    } catch (error) {
      throw new Error(`Failed to bulk create ${this.modelName}s: ${error}`);
    }
  }

  async bulkUpdate(where: WhereInput, data: Partial<UpdateInput>): Promise<{ count: number }> {
    try {
      return await this.model.updateMany({ where, data });
    } catch (error) {
      throw new Error(`Failed to bulk update ${this.modelName}s: ${error}`);
    }
  }

  async bulkDelete(where: WhereInput): Promise<{ count: number }> {
    try {
      return await this.model.deleteMany({ where });
    } catch (error) {
      throw new Error(`Failed to bulk delete ${this.modelName}s: ${error}`);
    }
  }
}