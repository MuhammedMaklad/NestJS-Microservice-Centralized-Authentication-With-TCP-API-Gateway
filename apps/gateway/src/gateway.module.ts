import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "AUTH_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "auth",
          port: 4000
        }
      },
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "user",
          port: 4001
        }
      }
    ])
  ],
  controllers: [GatewayController, AuthController],
  providers: [GatewayService],
})
export class GatewayModule { }
