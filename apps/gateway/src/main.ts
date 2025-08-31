import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { APP_GLOBAL_PREFIX } from './constant';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.setGlobalPrefix(APP_GLOBAL_PREFIX);

  const port = process.env.port ?? 3000;

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  const config = new DocumentBuilder()
    .setTitle("Api-gateway Service")
    .addTag("Api-gateway")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory, {
    jsonDocumentUrl: "swagger/json",
  });

  await app.listen(port);
  await app.startAllMicroservices();

  Logger.log(
    `🚀 Application is running on: http://localhost:${3001}/${APP_GLOBAL_PREFIX}` + "\n" +
    `🚀 Swagger is running on: http://localhost:${3001}/swagger`,
  );

}
bootstrap().catch(e => Logger.log(e));
