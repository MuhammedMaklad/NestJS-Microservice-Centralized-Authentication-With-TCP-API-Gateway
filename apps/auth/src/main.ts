import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: 4000
    }
  });
  await app.listen();
}
bootstrap()
  .then(() => Logger.log("Auth Microservice Running on Port:4000"))
  .catch((e) => Logger.error(e))
