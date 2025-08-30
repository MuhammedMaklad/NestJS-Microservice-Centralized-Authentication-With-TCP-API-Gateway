import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MESSAGE_PATTERNS } from '@app/shared/interfaces/auth.interface';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto, CreateUserResponse } from '@app/shared/dtos/user.dto';

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(@Inject("USER_SERVICE") private client: ClientProxy) { }

  getHello(): string {
    return 'Hello World!!!';
  }

  // TODO: Register User
  async RegisterUser(userCredentials: CreateUserDto): Promise<{ msg: string } | CreateUserResponse> {

    this.logger.log(userCredentials);

    const { email } = userCredentials;

    const response = this.client.send<boolean>(MESSAGE_PATTERNS.CHECK_USER_EXIST, email);

    this.logger.log(response);

    const isExist = await firstValueFrom(response);

    if (isExist)
      return {
        msg: "User already Exist",
      };

    const createUserResponse = this.client.send({ cmd: "create_user" }, userCredentials);

    const user = await firstValueFrom(createUserResponse);

    this.logger.log(user);

    return plainToInstance(CreateUserResponse, user);
  }
}
