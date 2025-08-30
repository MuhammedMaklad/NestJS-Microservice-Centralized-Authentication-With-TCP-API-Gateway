import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Logger } from '@nestjs/common';
import { APP_GLOBAL_PREFIX } from '../constants/constant';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const port = process.env.port ?? 3000;

  app.setGlobalPrefix(APP_GLOBAL_PREFIX);
  await app.listen(port);

  Logger.log(`User Service running on http://localhost:${port}/${APP_GLOBAL_PREFIX}/`)
}
bootstrap().catch(e => Logger.error(e))
