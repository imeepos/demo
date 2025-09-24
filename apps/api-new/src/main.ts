import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRabbitMQConfig } from './config/rabbitmq.config';

async function bootstrap() {
  // 创建混合应用（HTTP + 微服务）
  const app = await NestFactory.create(AppModule);

  // 启用CORS以允许前端访问
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Vite dev server 和其他可能的端口
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // API 全局前缀
  app.setGlobalPrefix('api');

  // 连接 RabbitMQ 微服务
  const rabbitMQConfig = getRabbitMQConfig();
  app.connectMicroservice(rabbitMQConfig);

  // 启动所有微服务
  await app.startAllMicroservices();
  console.log('🐰 RabbitMQ 微服务已启动');

  // 启动HTTP服务器
  const port = process.env.PORT ?? 3002; // 使用3002端口避免与前端冲突
  await app.listen(port, '0.0.0.0'); // 监听所有网络接口

  console.log(`🚀 API Server is running on: http://localhost:${port}/api`);
  console.log(`📡 数据清洗微服务正在监听 RabbitMQ 队列`);
}

void bootstrap();
