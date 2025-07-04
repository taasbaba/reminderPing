import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import Redis from 'ioredis';

async function checkRedis() {
  const redis = new Redis(process.env.REDIS_URL!);
  try {
    const pong = await redis.ping();
    console.log('[Redis] PING =', pong);
  } catch (err) {
    console.error('[Redis] Connection failed:', err);
  } finally {
    redis.disconnect();
  }
}
// checkRedis();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://reminder-ping.vercel.app'],
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
