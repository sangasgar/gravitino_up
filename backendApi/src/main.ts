import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const configService = app.get(ConfigService)
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost',
      'https://localhost',
      'http://31.172.73.217',
      'https://31.172.73.217',
      'http://up.gravitino.ru',
      'http://gravitino.ru',
      'https://up.gravitino.ru',
      'https://gravitino.ru',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('GRAIVTINO ASU API')
    .setDescription('The GRAIVTINO ASU API!')
    .setVersion('1.0')
    .addTag('GRAIVTINO ASU')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
    )
    .build();
  const port = configService.get('port');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
