import { Controller, Get, Inject, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { AuthGard } from "../guards/auth/auth.guard";
import { Request } from "express";
import { firstValueFrom } from "rxjs";



@Controller("user")
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) { }

  @UseGuards(AuthGard)
  @Get('get-profile')
  async getUserProfile(@Req() req) {
    const userId = req?.user?.userId;
    const user$ = this.userClient.send({ cmd: "get_user_profile" }, userId);
    const userProfile = await firstValueFrom(user$);
    return {
      data: userProfile
    };
  }
}