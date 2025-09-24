import { Controller, Post, Body, Get, Logger } from '@nestjs/common';
import { MessagePublisherService } from './message-publisher.service';
import { DataCleanerService } from './data-cleaner.service';
import { RawDataDto } from './dto/data-cleaner.dto';

/**
 * 数据清洗测试控制器
 * 用于测试和演示数据清洗微服务功能
 */
@Controller('data-cleaner')
export class DataCleanerTestController {
  private readonly logger = new Logger(DataCleanerTestController.name);

  constructor(
    private readonly messagePublisher: MessagePublisherService,
    private readonly dataCleanerService: DataCleanerService,
  ) {}

  /**
   * 测试发布单条原始数据到 RabbitMQ
   */
  @Post('publish')
  publishTestData(@Body() data?: Partial<RawDataDto>) {
    const testData: RawDataDto = {
      id: data?.id || `test_${Date.now()}`,
      source: data?.source || 'test_source',
      content:
        data?.content ||
        `
        <div>这是一个<strong>测试</strong>数据 🎉</div>
        <p>包含HTML标签和表情符号</p>
        <a href="https://example.com">这里有个链接</a>
        <script>alert('xss')</script>
        多余的    空格     和换行
        
        
        需要清洗！
      `,
      metadata: data?.metadata || { testType: 'manual' },
      timestamp: new Date(),
    };

    try {
      this.messagePublisher.publishRawData(testData);
      return {
        success: true,
        message: '测试数据已发布到 RabbitMQ 队列',
        data: testData,
      };
    } catch (error) {
      this.logger.error(
        '发布测试数据失败',
        error instanceof Error ? error.stack : String(error),
      );
      return {
        success: false,
        message: `发布失败: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * 测试发布批量数据
   */
  @Post('publish-batch')
  publishBatchTestData() {
    const testDataList: RawDataDto[] = Array.from({ length: 3 }, (_, i) => ({
      id: `batch_test_${Date.now()}_${i}`,
      source: 'batch_test_source',
      content: `
        <h1>批量测试数据 ${i + 1}</h1>
        <p>这是第 ${i + 1} 条测试数据</p>
        <script>console.log('test ${i + 1}');</script>
        包含HTML、JS和各种需要清洗的内容 🚀
        访问链接: https://test-${i}.example.com
      `,
      metadata: { batchIndex: i, testType: 'batch' },
      timestamp: new Date(),
    }));

    try {
      this.messagePublisher.publishBatchData(testDataList);
      return {
        success: true,
        message: `${testDataList.length} 条批量测试数据已发布到 RabbitMQ 队列`,
        count: testDataList.length,
      };
    } catch (error) {
      this.logger.error(
        '发布批量测试数据失败',
        error instanceof Error ? error.stack : String(error),
      );
      return {
        success: false,
        message: `批量发布失败: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * 同步测试数据清洗
   */
  @Post('clean-sync')
  testCleanSync(@Body() data?: Partial<RawDataDto>) {
    const testData: RawDataDto = {
      id: data?.id || `sync_test_${Date.now()}`,
      source: data?.source || 'sync_test',
      content:
        data?.content ||
        `
        <div class="test">同步测试数据</div>
        <p>包含<script>alert('xss');</script>脚本标签</p>
        <a href="https://malicious-site.com">恶意链接</a>
        大量的      空格   和    换行符


        需要进行清洗处理！ 🧹
      `,
      metadata: data?.metadata || { testType: 'sync' },
      timestamp: new Date(),
    };

    try {
      const result = this.messagePublisher.cleanDataSync(testData);
      return {
        success: true,
        message: '同步数据清洗完成',
        original: testData,
        cleaned: result,
      };
    } catch (error) {
      this.logger.error(
        '同步数据清洗失败',
        error instanceof Error ? error.stack : String(error),
      );
      return {
        success: false,
        message: `同步清洗失败: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * 直接调用本地清洗服务（不通过RabbitMQ）
   */
  @Post('clean-local')
  testCleanLocal(@Body() data?: Partial<RawDataDto>) {
    const testData: RawDataDto = {
      id: data?.id || `local_test_${Date.now()}`,
      source: data?.source || 'local_test',
      content:
        data?.content ||
        `
        <h2>本地清洗测试</h2>
        <p>这是一个包含HTML标签的文本</p>
        <script src="https://evil.com/script.js"></script>
        <img src="https://example.com/image.png" alt="测试图片">
        访问我们的网站: https://company.com/about
        
        多余的空格和换行需要处理
        
        
        表情符号测试: 🎉 🚀 ✨ 🎯
      `,
      metadata: data?.metadata || { testType: 'local' },
      timestamp: new Date(),
    };

    try {
      const result = this.dataCleanerService.cleanData(testData);
      return {
        success: true,
        message: '本地数据清洗完成',
        original: testData,
        cleaned: result,
        comparison: {
          originalLength: testData.content.length,
          cleanedLength: result.cleanedContent.length,
          compressionRatio:
            (
              ((testData.content.length - result.cleanedContent.length) /
                testData.content.length) *
              100
            ).toFixed(2) + '%',
        },
      };
    } catch (error) {
      this.logger.error(
        '本地数据清洗失败',
        error instanceof Error ? error.stack : String(error),
      );
      return {
        success: false,
        message: `本地清洗失败: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  /**
   * 获取健康状态
   */
  @Get('health')
  getHealth() {
    try {
      const health = this.messagePublisher.checkHealth();
      return {
        success: true,
        health,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        message: `健康检查失败: ${error instanceof Error ? error.message : String(error)}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * 获取默认清洗配置
   */
  @Get('config')
  getConfig() {
    return {
      success: true,
      config: this.dataCleanerService.getDefaultConfig(),
    };
  }
}
