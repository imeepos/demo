import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import type { Channel, Message } from 'amqplib';
import { SpiderService } from './spider.service';
import type {
  CrawlTaskDto,
  CrawlResultDto,
  BatchCrawlTaskDto,
  CrawlConfigDto,
} from './dto/spider.dto';

@Controller()
export class SpiderController {
  private readonly logger = new Logger(SpiderController.name);

  constructor(private readonly spiderService: SpiderService) {}

  /**
   * 监听爬取任务消息队列 - 单个任务
   * 队列名称: crawl_task_queue
   */
  @EventPattern('crawl_task_received')
  async handleCrawlTask(@Payload() task: CrawlTaskDto, @Ctx() context: RmqContext) {
    this.logger.log(`收到爬取任务消息: ${task.id} - ${task.url}`);

    try {
      const result = await this.spiderService.crawlTask(task);

      // 确认消息
      const channel = context.getChannelRef() as Channel;
      const originalMsg = context.getMessage() as Message;
      channel.ack(originalMsg);

      this.logger.log(`爬取任务完成: ${result.id}, 状态: ${result.status}`);

      // TODO: 可以在这里将爬取结果发送到下一个队列
      // await this.publishCrawlResult(result);
    } catch (error) {
      this.logger.error(
        `处理爬取任务失败: ${task.id}`,
        error instanceof Error ? error.stack : String(error),
      );

      // 拒绝消息并重新排队
      const channel = context.getChannelRef() as Channel;
      const originalMsg = context.getMessage() as Message;
      channel.nack(originalMsg, false, true);
    }
  }

  /**
   * 监听批量爬取任务请求
   * 队列名称: batch_crawl_queue
   */
  @EventPattern('batch_crawl_requested')
  async handleBatchCrawl(@Payload() batchTask: BatchCrawlTaskDto, @Ctx() context: RmqContext) {
    this.logger.log(`收到批量爬取请求, 任务数量: ${batchTask.tasks.length}`);

    try {
      const results = await this.spiderService.crawlBatchTasks(batchTask);

      // 确认消息
      const channel = context.getChannelRef() as Channel;
      const originalMsg = context.getMessage() as Message;
      channel.ack(originalMsg);

      const successCount = results.filter(r => r.status === 'success').length;
      this.logger.log(`批量爬取完成: ${successCount}/${batchTask.tasks.length}`);

      // TODO: 可以在这里将批量爬取结果发送到下一个队列
      // await this.publishBatchCrawlResults(results);
    } catch (error) {
      this.logger.error(`批量爬取失败`, error instanceof Error ? error.stack : String(error));

      // 拒绝消息并重新排队
      const channel = context.getChannelRef() as Channel;
      const originalMsg = context.getMessage() as Message;
      channel.nack(originalMsg, false, true);
    }
  }

  /**
   * 监听优先级爬取任务
   * 队列名称: priority_crawl_queue
   */
  @EventPattern('priority_crawl_task')
  async handlePriorityCrawlTask(@Payload() task: CrawlTaskDto, @Ctx() context: RmqContext) {
    this.logger.log(`收到优先级爬取任务: ${task.id} - 优先级: ${task.priority || 1}`);

    try {
      // 优先级任务可能需要特殊处理，比如更短的延迟等
      const priorityConfig: CrawlConfigDto = {
        ...this.spiderService.getDefaultConfig(),
        delay: Math.max(500, (task.config?.delay || 1000) / 2), // 优先级任务延迟减半
        timeout: (task.config?.timeout || 30000) * 1.5, // 优先级任务超时时间增加
      };

      const result = await this.spiderService.crawlTask(task, priorityConfig);

      // 确认消息
      const channel = context.getChannelRef() as Channel;
      const originalMsg = context.getMessage() as Message;
      channel.ack(originalMsg);

      this.logger.log(`优先级爬取任务完成: ${result.id}, 状态: ${result.status}`);
    } catch (error) {
      this.logger.error(
        `处理优先级爬取任务失败: ${task.id}`,
        error instanceof Error ? error.stack : String(error),
      );

      // 拒绝消息并重新排队
      const channel = context.getChannelRef() as Channel;
      const originalMsg = context.getMessage() as Message;
      channel.nack(originalMsg, false, true);
    }
  }

  /**
   * 同步爬取 - 用于测试和直接调用
   */
  @MessagePattern({ cmd: 'crawl_sync' })
  async crawlSync(@Payload() task: CrawlTaskDto): Promise<CrawlResultDto> {
    this.logger.log(`收到同步爬取请求: ${task.id} - ${task.url}`);

    try {
      const result = await this.spiderService.crawlTask(task);
      this.logger.log(`同步爬取完成: ${result.id}, 状态: ${result.status}`);
      return result;
    } catch (error) {
      this.logger.error(
        `同步爬取失败: ${task.id}`,
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
      service: 'spider',
    };
  }

  /**
   * 获取爬取配置
   */
  @MessagePattern({ cmd: 'get_crawl_config' })
  getCrawlConfig(): CrawlConfigDto {
    return this.spiderService.getDefaultConfig();
  }

  /**
   * 验证爬取配置
   */
  @MessagePattern({ cmd: 'validate_crawl_config' })
  validateCrawlConfig(@Payload() config: CrawlConfigDto): {
    valid: boolean;
    errors: string[];
  } {
    return this.spiderService.validateConfig(config);
  }

  // 私有方法：发布爬取结果到下一个队列
  // private async publishCrawlResult(result: CrawlResultDto) {
  //   // TODO: 这里可以使用 ClientProxy 发送到其他微服务或队列
  //   // 比如发送到数据处理服务、数据存储服务等
  // }

  // 私有方法：发布批量爬取结果
  // private async publishBatchCrawlResults(results: CrawlResultDto[]) {
  //   // TODO: 批量发送爬取结果
  // }
}
