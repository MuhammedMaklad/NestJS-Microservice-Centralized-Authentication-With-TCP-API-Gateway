import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AuthGard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization']
    if (!authHeader)
      throw new UnauthorizedException("missing token");

    const token = authHeader.split(" ")[1];
    const result = await firstValueFrom(this.authClient.send({ cmd: "validate_token" }, token));

    if (!result?.valid)
      throw new UnauthorizedException("Invalid Token");

    request.user = { userId: result.userId, username: result.username };
    return true;
  }
}