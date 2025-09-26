/* eslint-disable @typescript-eslint/no-require-imports */

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { exec } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';
import { AppModule } from './app.module';
const killPort = require('kill-port');

const execAsync = promisify(exec);

/**
 * 检查端口是否被占用
 * @param port 端口号
 * @returns 是否被占用
 */
async function isPortInUse(port: number): Promise<boolean> {
  try {
    const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
    return stdout.trim().length > 0;
  } catch {
    return false;
  }
}

/**
 * 强制关闭占用指定端口的进程
 * @param port 端口号
 */
async function forceKillPort(port: number): Promise<void> {
  try {
    console.log(`🔍 检查端口 ${port} 是否被占用...`);
    const inUse = await isPortInUse(port);

    if (inUse) {
      console.log(`⚠️  端口 ${port} 被占用，正在强制关闭占用进程...`);
      await killPort(port);
      console.log(`✅ 成功关闭占用端口 ${port} 的进程`);

      // 等待一段时间确保端口释放
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      console.log(`✅ 端口 ${port} 可用`);
    }
  } catch (error) {
    console.warn(
      `⚠️  关闭端口 ${port} 时出现错误:`,
      error instanceof Error ? error.message : error,
    );
    // 继续执行，不阻止应用启动
  }
}

async function bootstrap() {
  // 创建HTTP应用
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 静态文件代理 - 提供 public 目录下的静态文件
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // 启用CORS以允许前端访问
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Vite dev server 和其他可能的端口
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // API 全局前缀 - 必须在 Swagger 配置之前设置
  app.setGlobalPrefix('api');

  // 启用全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动过滤掉非DTO属性
      forbidNonWhitelisted: true, // 当有非白名单属性时抛出错误
      transform: true, // 自动转换类型
      transformOptions: {
        enableImplicitConversion: true, // 启用隐式类型转换
      },
    }),
  );

  // 配置 Swagger 文档
  const config = new DocumentBuilder()
    .setTitle('舆情分析系统 API')
    .setDescription(
      '舆情分析系统的 REST API 文档，提供舆情事件、统计指标等数据接口',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // 添加 OpenAPI JSON 接口
  app.getHttpAdapter().get('/api/openapi.json', (req: any, res: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });

  // 启动HTTP服务器
  const port = Number(process.env.PORT) || 3011; // 使用3011端口避免冲突

  // 启动前检查并强制关闭占用端口的进程
  await forceKillPort(port);

  await app.listen(port, '0.0.0.0'); // 监听所有网络接口

  console.log(`🚀 API Server is running on: http://localhost:${port}/api`);
  console.log(
    `📚 API Documentation is available at: http://localhost:${port}/docs`,
  );
}

void bootstrap();
