import { Injectable, Logger } from '@nestjs/common';
import { CrawlTaskDto, CrawlResultDto, CrawlConfigDto, BatchCrawlTaskDto } from './dto/spider.dto';

@Injectable()
export class SpiderService {
  private readonly logger = new Logger(SpiderService.name);

  private readonly defaultConfig: CrawlConfigDto = {
    delay: 1000, // 默认延迟1秒
    timeout: 30000, // 默认超时30秒
    retries: 3, // 默认重试3次
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    javascript: false, // 默认不执行JavaScript
    extractRules: [], // 默认无提取规则
  };

  /**
   * 执行爬取任务
   */
  async crawlTask(
    task: CrawlTaskDto,
    config: CrawlConfigDto = this.defaultConfig,
  ): Promise<CrawlResultDto> {
    this.logger.log(`开始爬取任务: ${task.id} - ${task.url}`);

    const startTime = Date.now();
    const mergedConfig = { ...this.defaultConfig, ...task.config, ...config };

    try {
      // TODO: 实现具体的爬取逻辑
      // 这里暂时返回一个模拟结果
      const content = await this.performCrawl(task.url, mergedConfig);

      const processingTime = Date.now() - startTime;
      this.logger.log(`爬取任务完成: ${task.id}, 耗时: ${processingTime}ms`);

      const result: CrawlResultDto = {
        id: `result_${task.id}_${Date.now()}`,
        taskId: task.id,
        url: task.url,
        source: task.source,
        type: task.type,
        content,
        crawledAt: new Date(),
        status: 'success',
        processingTime,
      };

      return result;
    } catch (error) {
      const processingTime = Date.now() - startTime;
      this.logger.error(
        `爬取任务失败: ${task.id}`,
        error instanceof Error ? error.stack : String(error),
      );

      return {
        id: `result_${task.id}_${Date.now()}`,
        taskId: task.id,
        url: task.url,
        source: task.source,
        type: task.type,
        content: '',
        crawledAt: new Date(),
        status: 'failed',
        processingTime,
        errors: [`爬取过程发生错误: ${error instanceof Error ? error.message : String(error)}`],
      };
    }
  }

  /**
   * 批量执行爬取任务
   */
  async crawlBatchTasks(batchTask: BatchCrawlTaskDto): Promise<CrawlResultDto[]> {
    this.logger.log(`开始批量爬取任务, 数量: ${batchTask.tasks.length}`);

    const results: CrawlResultDto[] = [];

    for (const task of batchTask.tasks) {
      try {
        const result = await this.crawlTask(task, batchTask.config);
        results.push(result);

        // 如果配置了延迟，则等待
        if (batchTask.config?.delay) {
          await this.delay(batchTask.config.delay);
        }
      } catch (error) {
        this.logger.error(
          `批量爬取中的任务失败: ${task.id}`,
          error instanceof Error ? error.stack : String(error),
        );

        // 即使单个任务失败，也要继续处理其他任务
        results.push({
          id: `result_${task.id}_${Date.now()}`,
          taskId: task.id,
          url: task.url,
          source: task.source,
          type: task.type,
          content: '',
          crawledAt: new Date(),
          status: 'failed',
          errors: [`任务执行失败: ${error instanceof Error ? error.message : String(error)}`],
        });
      }
    }

    const successCount = results.filter(r => r.status === 'success').length;
    this.logger.log(`批量爬取完成: ${successCount}/${batchTask.tasks.length} 成功`);

    return results;
  }

  /**
   * 获取默认配置
   */
  getDefaultConfig(): CrawlConfigDto {
    return { ...this.defaultConfig };
  }

  /**
   * 验证爬取配置
   */
  validateConfig(config: CrawlConfigDto): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // 验证延迟时间
    if (config.delay !== undefined && config.delay < 0) {
      errors.push('延迟时间不能为负数');
    }

    // 验证超时时间
    if (config.timeout !== undefined && config.timeout <= 0) {
      errors.push('超时时间必须大于0');
    }

    // 验证重试次数
    if (config.retries !== undefined && config.retries < 0) {
      errors.push('重试次数不能为负数');
    }

    // 验证提取规则
    if (config.extractRules) {
      config.extractRules.forEach((rule, index) => {
        if (!rule.name) {
          errors.push(`提取规则 ${index}: 缺少名称`);
        }
        if (!rule.selector) {
          errors.push(`提取规则 ${rule.name || index}: 缺少选择器`);
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * 执行具体的爬取操作（待实现）
   */
  private async performCrawl(url: string, config: CrawlConfigDto): Promise<string> {
    // TODO: 实现具体的爬取逻辑
    // 可以使用 puppeteer, playwright, cheerio, axios 等库

    this.logger.debug(`模拟爬取: ${url}`);

    // 模拟延迟
    if (config.delay) {
      await this.delay(config.delay);
    }

    // 返回模拟内容
    return `模拟爬取的内容 - ${url} - ${new Date().toISOString()}`;
  }

  /**
   * 延迟函数
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
