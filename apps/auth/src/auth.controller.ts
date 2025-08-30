import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/shared/dtos/user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @MessagePattern("register_user")
  async register(@Payload() userCredentials: CreateUserDto) {
    return this.authService.RegisterUser(userCredentials);
  }
}
