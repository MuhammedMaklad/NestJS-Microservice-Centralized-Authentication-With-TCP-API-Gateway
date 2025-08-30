import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterUserDto } from './dtos/register-user.dto';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto, CreateUserResponse, MESSAGE_PATTERNS } from '@app/shared/interfaces/auth.interface';

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(@Inject("USER_SERVICE") private client: ClientProxy) { }

  getHello(): string {
    return 'Hello World!!!';
  }

  // TODO: Register User
  async RegisterUser(userCredentials: CreateUserDto): Promise<{ msg: string } | CreateUserResponse> {


    const { email } = userCredentials;

    const response = this.client.send<boolean>(MESSAGE_PATTERNS.CHECK_USER_EXIST, email);

    const isExist = await firstValueFrom(response);

    if (isExist)
      return {
        msg: "User already Exist",
      };

    const createUserResponse = this.client.send({ cmd: "create_user" }, userCredentials);

    const user = await firstValueFrom(createUserResponse);

  }
}
