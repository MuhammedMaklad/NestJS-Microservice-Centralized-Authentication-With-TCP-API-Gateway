import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Logger } from '@nestjs/common';
import { APP_GLOBAL_PREFIX } from '../constants/constant';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: "localhost",
      port: 3001,
    }
  });

  const port = process.env.port ?? 3000;

  const config = new DocumentBuilder()
    .setTitle("User Service")
    .addTag("Users")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: "swagger/json",
  });

  app.setGlobalPrefix(APP_GLOBAL_PREFIX);

  await app.startAllMicroservices();
  await app.listen(port);

  Logger.log(`User Service running on http://localhost:${3002}/${APP_GLOBAL_PREFIX}/`)
}
bootstrap().catch(e => Logger.error(e))
