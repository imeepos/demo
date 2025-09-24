import { Controller, Logger } from '@nestjs/common';
import {
  EventPattern,
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import type { Channel, Message } from 'amqplib';
import { DataCleanerService } from './data-cleaner.service';
import type { RawDataDto, CleanedDataDto } from './dto/data-cleaner.dto';

@Controller()
export class DataCleanerController {
  private readonly logger = new Logger(DataCleanerController.name);

  constructor(private readonly dataCleanerService: DataCleanerService) {}

  /**
   * 监听原始数据消息队列 - 单条数据清洗
   * 队列名称: raw_data_queue
   */
  @EventPattern('raw_data_received')
  handleRawDataReceived(
    @Payload() data: RawDataDto,
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(`收到原始数据消息: ${data.id}`);

    try {
      const cleanedData = this.dataCleanerService.cleanData(data);

      // 确认消息
      const channel = context.getChannelRef() as Channel;
      const originalMsg = context.getMessage() as Message;
      channel.ack(originalMsg);

      // 这里可以将清洗后的数据发送到下一个队列
      this.logger.log(
        `数据清洗完成: ${cleanedData.id}, 状态: ${cleanedData.status}`,
      );

      // 可以在这里发布清洗完成的事件到其他队列
      // await this.publishCleanedData(cleanedData);
    } catch (error) {
      this.logger.error(
        `处理原始数据失败: ${data.id}`,
        error instanceof Error ? error.stack : String(error),
      );

      // 拒绝消息并重新排队
      const channel = context.getChannelRef() as Channel;
      const originalMsg = context.getMessage() as Message;
      channel.nack(originalMsg, false, true);
    }
  }

  /**
   * 监听批量数据清洗请求
   * 队列名称: batch_data_clean_queue
   */
  @EventPattern('batch_data_clean_requested')
  handleBatchDataClean(
    @Payload() data: RawDataDto[],
    @Ctx() context: RmqContext,
  ) {
    this.logger.log(`收到批量数据清洗请求, 数量: ${data.length}`);

    try {
      const cleanedDataList = this.dataCleanerService.cleanBatchData(data);

      // 确认消息
      const channel = context.getChannelRef() as Channel;
      const originalMsg = context.getMessage() as Message;
      channel.ack(originalMsg);

      this.logger.log(
        `批量数据清洗完成: ${cleanedDataList.length}/${data.length}`,
      );
    } catch (error) {
      this.logger.error(
        `批量数据清洗失败`,
        error instanceof Error ? error.stack : String(error),
      );

      // 拒绝消息并重新排队
      const channel = context.getChannelRef() as Channel;
      const originalMsg = context.getMessage() as Message;
      channel.nack(originalMsg, false, true);
    }
  }

  /**
   * 同步数据清洗 - 用于测试和直接调用
   */
  @MessagePattern({ cmd: 'clean_data_sync' })
  cleanDataSync(@Payload() data: RawDataDto): CleanedDataDto {
    this.logger.log(`收到同步数据清洗请求: ${data.id}`);

    try {
      const result = this.dataCleanerService.cleanData(data);
      this.logger.log(`同步数据清洗完成: ${result.id}, 状态: ${result.status}`);
      return result;
    } catch (error) {
      this.logger.error(
        `同步数据清洗失败: ${data.id}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  /**
   * 获取服务健康状态
   */
  @MessagePattern({ cmd: 'health_check' })
  healthCheck(): {
    status: string;
    timestamp: string;
    service: string;
  } {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'data-cleaner',
    };
  }

  /**
   * 获取清洗配置
   */
  @MessagePattern({ cmd: 'get_cleaning_config' })
  getCleaningConfig() {
    return this.dataCleanerService.getDefaultConfig();
  }

  // 私有方法：发布清洗完成的数据到下一个队列
  // private async publishCleanedData(cleanedData: CleanedDataDto) {
  //   // 这里可以使用 ClientProxy 发送到其他微服务或队列
  //   // 比如发送到数据存储服务、数据分析服务等
  // }
}
