import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRabbitMQConfig } from './config/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, getRabbitMQConfig());

  await app.listen();
  console.log('🧹 Data Cleaner Microservice is running');
}

void bootstrap();
