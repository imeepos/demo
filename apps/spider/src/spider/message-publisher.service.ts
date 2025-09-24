import { getRabbitMQConfig } from '@/config/rabbitmq.config';
import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CrawlResultDto } from './dto/spider.dto';

@Injectable()
export class MessagePublisherService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MessagePublisherService.name);
  private client!: ClientProxy;

  async onModuleInit() {
    // 创建RabbitMQ客户端用于发布消息
    this.client = ClientProxyFactory.create(getRabbitMQConfig());
    await this.client.connect();
    this.logger.log('RabbitMQ 客户端连接成功');
  }

  async onModuleDestroy() {
    await this.client?.close();
  }

  /**
   * 发布爬取结果到清洗队列
   */
  publishCrawlResult(data: CrawlResultDto): void {
    try {
      this.logger.log(`发布爬取结果到队列: ${data.id}`);
      this.client.emit('crawl_result_received', data);
      this.logger.log(`爬取结果发布成功: ${data.id}`);
    } catch (error) {
      this.logger.error(`发布爬取结果失败: ${data.id}`, (error as Error).stack);
      throw error;
    }
  }

  /**
   * 发布批量爬取结果到清洗队列
   */
  publishBatchCrawlResults(dataList: CrawlResultDto[]): void {
    try {
      this.logger.log(`发布批量爬取结果到队列, 数量: ${dataList.length}`);
      this.client.emit('batch_crawl_results_received', dataList);
      this.logger.log(`批量爬取结果发布成功: ${dataList.length} 条`);
    } catch (error) {
      this.logger.error(`发布批量爬取结果失败`, (error as Error).stack);
      throw error;
    }
  }

  /**
   * 同步处理爬取结果
   */
  processCrawlResultSync(data: CrawlResultDto): Observable<any> {
    try {
      this.logger.log(`同步处理爬取结果: ${data.id}`);
      const result = this.client.send({ cmd: 'process_crawl_result_sync' }, data);
      this.logger.log(`同步爬取结果处理完成: ${data.id}`);
      return result;
    } catch (error) {
      this.logger.error(`同步爬取结果处理失败: ${data.id}`, (error as Error).stack);
      throw error;
    }
  }

  /**
   * 检查服务健康状态
   */
  checkHealth(): Observable<any> {
    try {
      const result = this.client.send({ cmd: 'health_check' }, {});
      return result;
    } catch (error) {
      this.logger.error('健康检查失败', (error as Error).stack);
      throw error;
    }
  }
}
