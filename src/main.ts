import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port || 3000, () => {
    Logger.log(`App started on port: ${port}`);
  });
}

bootstrap();
