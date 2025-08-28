import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const port = process.env.port ?? 3000;
  await app.listen(port);
  Logger.log(`User Service running on http://localhost:${port}/`)
}
bootstrap().catch(e => Logger.error(e))
