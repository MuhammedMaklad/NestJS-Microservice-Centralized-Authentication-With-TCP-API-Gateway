import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { instanceToPlain } from 'class-transformer';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) { }

  @Get("test")
  getHello(): string {
    return this.userService.getHello();
  }

  @ApiBody({
    type: CreateUserDto,
    description: "User Credentials"
  })
  @Post("create")
  async registerUser(@Body() userCredential: CreateUserDto) {
    Logger.log(userCredential);

    const user = await this.userService.create(userCredential);
    return user;
  }

  @Get("get-user/:email")
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.userService.getUserByEmail(email);
    return user;
  }

  @MessagePattern({ cmd: "check_user_exist" })
  async CheckUserExist(@Payload() email: string) {
    return await this.getUserByEmail(email) ? true : false;
  }

  @MessagePattern({ cmd: "create_user" })
  async createUser(@Payload() userCredentials: CreateUserDto) {

    this.logger.log(userCredentials);

    const user = await this.userService.create(userCredentials);

    return instanceToPlain(user);
  }
}
