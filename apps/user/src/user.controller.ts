import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('user')
export class UserController {
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

  @Get("get-users")
  async getUsers() {
    const users = await this.userService.findMany({});
    return {
      data: users
    }
  }

  @Get("get-user/:email")
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.userService.getUserByEmail(email);
    return user;
  }

  @Get("get-user/:id")
  async getUserById(@Param('id') userId: string) {
    const user = await this.userService.findById(userId);
    return user;
  }

  @MessagePattern({ cmd: "check_user_exist" })
  async CheckUserExist(@Payload() email: string) {
    return await this.getUserByEmail(email) ? true : false;
  }

  @MessagePattern({ cmd: "create_user" })
  async createUser(@Payload() userCredentials: CreateUserDto) {
    Logger.log(userCredentials);

    const user = await this.userService.create(userCredentials);

    return user;
  }
}
