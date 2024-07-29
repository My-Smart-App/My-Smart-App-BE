import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // User Cookie Parser
  app.use(cookieParser());

  // My Smart App Swagger
  const config = new DocumentBuilder()
    .setTitle('My Smart App')
    .setDescription('My Smart App Swagger')
    .setVersion('1.0')
    .addTag('My Smart App')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // CORS
  app.enableCors({
    origin: ['*'],
    methods: ['GET', 'POST'],
    credentials: true,
  });

  await app.listen(8000);
}

bootstrap();
