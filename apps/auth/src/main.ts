import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(process.env.port ?? 3000);
  Logger.log(`Auth service running on port ${3000}`)
}
bootstrap();
