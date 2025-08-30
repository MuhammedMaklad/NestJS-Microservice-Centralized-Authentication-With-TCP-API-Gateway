import { Injectable } from '@nestjs/common';
import { BaseService } from '@app/database';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService extends BaseService<User, Prisma.UserCreateInput, Prisma.UserUpdateInput> {
  constructor(private readonly userRepository: UserRepository) {
    super(userRepository);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
