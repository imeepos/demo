import {
  IsString,
  IsNumber,
  IsOptional,
  IsDateString,
  Min,
  Max,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QuerySentimentEventDto {
  @ApiPropertyOptional({
    description: '标题模糊搜索',
    example: '交通事故',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: '情感分数最小值，范围 0.00-1.00',
    example: 0.2,
    minimum: 0,
    maximum: 1,
    type: 'number',
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  minScore?: number;

  @ApiPropertyOptional({
    description: '情感分数最大值，范围 0.00-1.00',
    example: 0.8,
    minimum: 0,
    maximum: 1,
    type: 'number',
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  maxScore?: number;

  @ApiPropertyOptional({
    description: '事件开始时间',
    example: '2024-01-01T00:00:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  @IsDateString()
  @IsOptional()
  startTime?: Date;

  @ApiPropertyOptional({
    description: '事件结束时间',
    example: '2024-01-31T23:59:59.999Z',
    type: 'string',
    format: 'date-time',
  })
  @IsDateString()
  @IsOptional()
  endTime?: Date;
}
