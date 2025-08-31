import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: {
          host: "user",
          port: 4001
        }
      },
    ]),
    JwtModule.register({
      global: true,
      secret: "JwtSecret",
      signOptions: {
        expiresIn: "1d"
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
