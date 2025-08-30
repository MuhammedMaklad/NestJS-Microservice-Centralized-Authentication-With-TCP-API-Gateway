import { DatabaseService, GenericRepository } from "@app/database";
import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";


@Injectable()
export class UserRepository extends GenericRepository<User, Prisma.UserCreateInput, Prisma.UserUpdateInput> {
  constructor(private readonly db: DatabaseService) {
    super(db, 'User');
  }
}