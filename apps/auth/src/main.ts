import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.TCP,
    options: {
      host: "localhost",
      port: 3001
    }
  });
  await app.listen();
}
bootstrap()
  .then(() => Logger.log("Auth Microservice Listen To port:3001"))
  .catch((e) => Logger.error(e))

