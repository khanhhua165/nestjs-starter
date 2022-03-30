import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const helmet = require('helmet');
require('pg').defaults.parseInt8 = true;

async function bootstrap() {
  const port = +process.env.PORT || 3008;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'blob:'],
        },
      },
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('MeetBiz')
    .setDescription('Meetbiz APIs')
    .setVersion('2.0')
    .addTag('liveserver')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
