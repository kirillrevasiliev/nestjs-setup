import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');
  await app.listen(port || 3000, () => {
    Logger.log(`App started on port: ${port}`);
  });
}

bootstrap();
