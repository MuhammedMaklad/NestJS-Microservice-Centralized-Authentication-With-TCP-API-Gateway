import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MESSAGE_PATTERNS } from '@app/shared/interfaces/auth.interface';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto, CreateUserResponse, UserCredentials } from '@app/shared/dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@app/shared/entities/user.entity';

@Injectable()
export class AuthService {

  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject("USER_SERVICE") private client: ClientProxy,
    private readonly jwtService: JwtService
  ) { }

  getHello(): string {
    return 'Hello World!!!';
  }

  // TODO: Register User
  async RegisterUser(userCredentials: CreateUserDto): Promise<{ msg: string } | CreateUserResponse> {

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

  // TODO: Login User
  async LoginUser(userCredentials: UserCredentials): Promise<{ msg: string } | { token: string }> {

    const response = this.client.send<UserEntity>({ cmd: "valid_user" }, userCredentials);

    const user = await firstValueFrom(response);

    if (!user)
      return {
        msg: "Invalid User Credentials",
      };

    const payload = {
      sub: user.id,
      username: user.username
    }

    const token = this.jwtService.sign(payload);
    return {
      token
    }
  }
}
