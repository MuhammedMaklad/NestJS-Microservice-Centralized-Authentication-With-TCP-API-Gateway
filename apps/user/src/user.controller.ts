import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Post("signup")
  async registerUser(@Body() userCredential: CreateUserDto) {
    Logger.log(userCredential);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const user = await this.userService.create(userCredential);
      return {
        statusCode: HttpStatus.CREATED,
        message: "User Created Successfully",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data: user
      };
    }
    catch (error) {
      Logger.error(error);
      if (error?.code === '23505') { // PostgreSQL unique violation
        throw new HttpException(
          'User already exists',
          HttpStatus.CONFLICT
        );
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @Get("get-user")
  async getUsers() {
    const users = await this.userService.findMany({});
    return {
      data: users
    }
  }
}
