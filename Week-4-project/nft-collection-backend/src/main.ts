import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const swaggerOptions = new DocumentBuilder()
    .setTitle('NFT Project')
    .setVersion('1.0.0')
    .setDescription('NFT Minting project for week 4')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
  const port = process.env.PORT || 8080;
  await app.listen(port);
}
bootstrap();
