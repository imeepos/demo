import { Injectable, Logger } from '@nestjs/common';
import {
  CleanedDataDto,
  DataCleaningConfigDto,
  RawDataDto,
} from './dto/data-cleaner.dto';

@Injectable()
export class DataCleanerService {
  private readonly logger = new Logger(DataCleanerService.name);

  private readonly defaultConfig: DataCleaningConfigDto = {
    rules: [
      {
        name: 'removeHtmlTags',
        description: '移除 HTML 标签',
        pattern: '<[^>]*>',
        replacement: '',
        enabled: true,
      },
      {
        name: 'removeUrls',
        description: '移除 URL 链接',
        pattern: 'https?://[\\S]+',
        replacement: '[链接]',
        enabled: true,
      },
      {
        name: 'removeEmojis',
        description: '移除表情符号',
        pattern:
          '[\\uD83D\\uDE00-\\uD83D\\uDE4F]|[\\uD83C\\uDF00-\\uD83D\\uDDFF]|[\\uD83D\\uDE80-\\uD83D\\uDEFF]|[\\u2600-\\u26FF]|[\\u2700-\\u27BF]',
        replacement: '',
        enabled: false,
      },
      {
        name: 'normalizeWhitespace',
        description: '规范化空白字符',
        pattern: '\\s+',
        replacement: ' ',
        enabled: true,
      },
    ],
    options: {
      removeHtml: true,
      removeUrls: true,
      removeEmojis: false,
      normalizeWhitespace: true,
      removeSpecialChars: false,
      minLength: 10,
      maxLength: 5000,
    },
  };

  /**
   * 清洗原始数据
   */
  cleanData(
    rawData: RawDataDto,
    config: DataCleaningConfigDto = this.defaultConfig,
  ): CleanedDataDto {
    this.logger.log(`开始清洗数据: ${rawData.id}`);

    const startTime = Date.now();
    const appliedRules: string[] = [];
    const errors: string[] = [];
    let cleanedContent = rawData.content;

    try {
      // 应用数据清洗规则
      for (const rule of config.rules) {
        if (!rule.enabled) continue;

        try {
          if (!rule.pattern) continue;
          const regex = new RegExp(rule.pattern, 'gu');
          const beforeLength = cleanedContent.length;
          cleanedContent = cleanedContent.replace(
            regex,
            rule.replacement || '',
          );

          if (cleanedContent.length !== beforeLength) {
            appliedRules.push(rule.name);
            this.logger.debug(`应用规则: ${rule.name}`);
          }
        } catch (error) {
          const errorMsg = `规则 ${rule.name} 执行失败: ${error instanceof Error ? error.message : String(error)}`;
          this.logger.warn(errorMsg);
          errors.push(errorMsg);
        }
      }

      // 应用基本选项
      if (config.options.normalizeWhitespace) {
        cleanedContent = cleanedContent.replace(/\s+/g, ' ').trim();
      }

      // 长度验证
      const isValidLength =
        cleanedContent.length >= config.options.minLength &&
        cleanedContent.length <= config.options.maxLength;

      if (!isValidLength && cleanedContent.length < config.options.minLength) {
        errors.push(
          `清洗后内容长度 ${cleanedContent.length} 小于最小长度 ${config.options.minLength}`,
        );
      }

      if (!isValidLength && cleanedContent.length > config.options.maxLength) {
        cleanedContent = cleanedContent.substring(0, config.options.maxLength);
        appliedRules.push('truncate');
        this.logger.debug(`内容被截断到 ${config.options.maxLength} 字符`);
      }

      const processingTime = Date.now() - startTime;
      this.logger.log(`数据清洗完成: ${rawData.id}, 耗时: ${processingTime}ms`);

      const result: CleanedDataDto = {
        id: rawData.id,
        source: rawData.source,
        cleanedContent,
        originalContent: rawData.content,
        cleaningRules: appliedRules,
        metadata: {
          ...rawData.metadata,
          processingTime,
          originalLength: rawData.content.length,
          cleanedLength: cleanedContent.length,
        },
        processedAt: new Date(),
        status: errors.length === 0 ? 'success' : 'partial',
        errors: errors.length > 0 ? errors : undefined,
      };

      return result;
    } catch (error) {
      this.logger.error(
        `数据清洗失败: ${rawData.id}`,
        error instanceof Error ? error.stack : String(error),
      );

      return {
        id: rawData.id,
        source: rawData.source,
        cleanedContent: rawData.content, // 返回原始内容
        originalContent: rawData.content,
        cleaningRules: appliedRules,
        metadata: rawData.metadata,
        processedAt: new Date(),
        status: 'failed',
        errors: [
          `清洗过程发生错误: ${error instanceof Error ? error.message : String(error)}`,
        ],
      };
    }
  }

  /**
   * 批量清洗数据
   */
  cleanBatchData(
    rawDataList: RawDataDto[],
    config?: DataCleaningConfigDto,
  ): CleanedDataDto[] {
    this.logger.log(`开始批量清洗数据, 数量: ${rawDataList.length}`);

    const results = rawDataList.map((data) => {
      try {
        return {
          status: 'fulfilled' as const,
          value: this.cleanData(data, config),
        };
      } catch (error) {
        return {
          status: 'rejected' as const,
          reason: error instanceof Error ? error : new Error(String(error)),
        };
      }
    });

    const successCount = results.filter((r) => r.status === 'fulfilled').length;
    this.logger.log(`批量清洗完成: ${successCount}/${rawDataList.length} 成功`);

    return results
      .filter(
        (result): result is { status: 'fulfilled'; value: CleanedDataDto } =>
          result.status === 'fulfilled',
      )
      .map((result) => result.value);
  }

  /**
   * 获取默认配置
   */
  getDefaultConfig(): DataCleaningConfigDto {
    return { ...this.defaultConfig };
  }

  /**
   * 验证数据清洗配置
   */
  validateConfig(config: DataCleaningConfigDto): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    // 验证规则
    config.rules.forEach((rule, index) => {
      if (!rule.name) {
        errors.push(`规则 ${index}: 缺少名称`);
      }
      if (!rule.pattern) {
        errors.push(`规则 ${rule.name || index}: 缺少正则表达式`);
      } else {
        try {
          new RegExp(rule.pattern);
        } catch (error) {
          errors.push(
            `规则 ${rule.name}: 正则表达式无效 - ${error instanceof Error ? error.message : String(error)}`,
          );
        }
      }
    });

    // 验证选项
    if (config.options.minLength < 0) {
      errors.push('最小长度不能为负数');
    }
    if (config.options.maxLength <= 0) {
      errors.push('最大长度必须大于0');
    }
    if (
      config.options.minLength >= 0 &&
      config.options.maxLength > 0 &&
      config.options.maxLength < config.options.minLength
    ) {
      errors.push('最大长度不能小于最小长度');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}
