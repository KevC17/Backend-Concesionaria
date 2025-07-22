import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalHttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalHttpExceptionFilter());

  app.enableCors({
    origin: ['http://localhost:5173','https://frontend-concesionaria.vercel.app','https://frontend-concesionaria-git-main-sdk17s-projects.vercel.app/'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
