import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { getRabbitMQConfig } from '@/config/rabbitmq.config';
import { RawDataDto } from './dto/data-cleaner.dto';

@Injectable()
export class MessagePublisherService implements OnModuleInit {
  private readonly logger = new Logger(MessagePublisherService.name);
  private client: ClientProxy;

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
   * 发布原始数据到清洗队列
   */
  publishRawData(data: RawDataDto): void {
    try {
      this.logger.log(`发布原始数据到队列: ${data.id}`);
      this.client.emit('raw_data_received', data);
      this.logger.log(`原始数据发布成功: ${data.id}`);
    } catch (error) {
      this.logger.error(`发布原始数据失败: ${data.id}`, (error as Error).stack);
      throw error;
    }
  }

  /**
   * 发布批量数据到清洗队列
   */
  publishBatchData(dataList: RawDataDto[]): void {
    try {
      this.logger.log(`发布批量数据到队列, 数量: ${dataList.length}`);
      this.client.emit('batch_data_clean_requested', dataList);
      this.logger.log(`批量数据发布成功: ${dataList.length} 条`);
    } catch (error) {
      this.logger.error(`发布批量数据失败`, (error as Error).stack);
      throw error;
    }
  }

  /**
   * 同步调用数据清洗服务
   */
  cleanDataSync(data: RawDataDto) {
    try {
      this.logger.log(`同步调用数据清洗: ${data.id}`);
      const result = this.client.send({ cmd: 'clean_data_sync' }, data);
      this.logger.log(`同步数据清洗完成: ${data.id}`);
      return result;
    } catch (error) {
      this.logger.error(`同步数据清洗失败: ${data.id}`, (error as Error).stack);
      throw error;
    }
  }

  /**
   * 检查服务健康状态
   */
  checkHealth() {
    try {
      const result = this.client.send({ cmd: 'health_check' }, {});
      return result;
    } catch (error) {
      this.logger.error('健康检查失败', (error as Error).stack);
      throw error;
    }
  }
}
