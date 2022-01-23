import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './configs/configs.service';
import { HttpExceptionFilter } from './shared/checkErrors';

const configService = new ConfigService();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('FLASH BUY')
    .setDescription('The Flash Buy Apis')
    .setVersion('1.0')
    .addTag('Flash Buy Apis')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  await app.listen(configService.internalPort, configService.internalHost, () =>
    console.log(`Our app is started at ${configService.internalPort}`),
  );
}
bootstrap();
