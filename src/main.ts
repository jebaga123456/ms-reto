import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Callback, Context, Handler } from 'aws-lambda';
import  serverlessExpress from '@codegenie/serverless-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppLogger } from './comics/infraestructure/logger/logger.service';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('SWAPI Combinate API')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(AppLogger))

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('reto/docs', app, document);

  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });

}


export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};