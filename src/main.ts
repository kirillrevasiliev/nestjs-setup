import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions, SwaggerCustomOptions } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());

  const docConfig = new DocumentBuilder().setTitle('Cats example').setVersion('1.0').addBearerAuth().build();
  const docOptions: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const setupOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  const document = SwaggerModule.createDocument(app, docConfig, docOptions);
  SwaggerModule.setup('api', app, document, setupOptions);

  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');
  const host = config.get<number>('API_HOST');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port || 3000, () => {
    Logger.log(`App started on port: ${port}`);
    Logger.log(`Swagger: ${host}:${port}/api`);
  });
}

bootstrap();
