import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiPrefix = process.env.API_PREFIX ?? 'api';
  const port = Number(process.env.PORT ?? 4000);

  app.enableCors('*')

  app.setGlobalPrefix(apiPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);
}

bootstrap().catch((err: unknown) => {
  console.error('Bootstrap failed', err);
  process.exit(1);
});
