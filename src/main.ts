import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const logger: Logger = await app.resolve(Logger);
  app.useLogger(logger);

  const config = new DocumentBuilder()
    .setTitle('App documentation')
    .setDescription('The application API description')
    .setVersion('0.0')
    .addTag('application')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port: number = configService.get<number>('app.port');

  logger.log(`Application is running on port ${port}`);
  await app.listen(port);
}
bootstrap();
