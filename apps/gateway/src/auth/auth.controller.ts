import { Body, Controller, Inject, Post, Res, HttpStatus, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto, UserCredentials } from '../../../../libs/shared/src/dtos/user.dto';
import { Response } from "express";
import { firstValueFrom } from "rxjs";
import { ApiBody } from "@nestjs/swagger";




@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) { }

  @ApiBody({
    type: CreateUserDto
  })
  @Post("signup")
  async signup(@Body() userCredentials: CreateUserDto, @Res() response: Response) {
    try {
      const res = this.authClient.send("register_user", userCredentials);
      const data = await firstValueFrom(res);
      return response.status(HttpStatus.CREATED).json({
        data
      })
    }
    catch (e) {
      this.logger.error(e);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "error while signup"
      })
    }
  }

  @ApiBody({
    type: UserCredentials
  })
  @Post('signin')
  async signin(@Body() userCredentials: UserCredentials) {
    try {
      const response = this.authClient.send('login_user', userCredentials);
      const data = await firstValueFrom(response);
      return data;
    }
    catch (e) {
      this.logger.error(e);
      return {
        message: "error while signup"
      }
    }
  }
}