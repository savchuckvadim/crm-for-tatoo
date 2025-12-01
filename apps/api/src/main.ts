import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { corsConfig } from './config/cors';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/utils/swagger';
import IORedis from 'ioredis';
const session = require('express-session');
import { RedisStore } from 'connect-redis';
// import ms from 'ms';

async function bootstrap() {
  // const cors = corsConfig()

  const app = await NestFactory.create(
    AppModule,
    // cors
  );
  const config = app.get(ConfigService)
  const redis = new IORedis(config.getOrThrow<string>('REDIS_URI'))

  app.setGlobalPrefix('api');
  setupSwagger(app)
  app.use(cookieParser(config.getOrThrow<string>('COOKIES_SECRET')))

  app.useGlobalPipes(new ValidationPipe(
    {
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,

    }
  ))
  app.use(
    session({

      secret: config.getOrThrow<string>('SESSION_SECRET'),
      name: config.getOrThrow<string>('SESSION_NAME'),
      resave: true,
      saveUninitialized: false,
      cookie: {
        domain: config.getOrThrow<string>('SESSION_DOMAIN'),
        httpOnly: true,
        secure: config.getOrThrow<string>('SESSION_SECURE') === 'true',
        maxAge: 63072000,
        sameSite: 'lax',
      },
      store: new RedisStore({ client: redis, prefix: config.getOrThrow<string>('SESSION_FOLDER') }),
    })
  )
  app.enableCors({
    origin: config.getOrThrow<string>('CORS_ORIGIN'),
    credentials: true,
    exposedHeaders: ['set-cookie'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // preflightContinue: false,
    optionsSuccessStatus: 204,

  })

  // глобально подключаем interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // глобально подключаем фильтр исключений
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(config.getOrThrow<number>('APP_PORT'));
}
bootstrap();
