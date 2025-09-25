import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsDateString,
  IsLatitude,
  IsLongitude,
  Length,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSentimentEventDto {
  @ApiProperty({
    description: '事件标题',
    example: '某地发生重大交通事故',
    minLength: 1,
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  title: string;

  @ApiPropertyOptional({
    description: '事件详细内容描述',
    example: '今日上午在某路段发生连环车祸，造成多人受伤',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    description:
      '情感分数，范围 0.00 到 1.00，0表示最负面，1表示最正面，0.5为中性',
    example: 0.25,
    minimum: 0,
    maximum: 1,
    type: 'number',
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  score: number;

  @ApiProperty({
    description: '纬度，支持7位小数精度',
    example: 39.9042,
    type: 'number',
  })
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @ApiProperty({
    description: '经度，支持7位小数精度',
    example: 116.4074,
    type: 'number',
  })
  @IsNumber()
  @IsLongitude()
  longitude: number;

  @ApiPropertyOptional({
    description: '事件发生的具体地址描述',
    example: '北京市朝阳区某某路段',
    maxLength: 500,
  })
  @IsString()
  @IsOptional()
  @Length(0, 500)
  address?: string;

  @ApiProperty({
    description: '信息来源媒体或平台',
    example: '新浪微博',
    minLength: 1,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  source: string;

  @ApiProperty({
    description: '事件发生的时间戳',
    example: '2024-01-15T10:30:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  @IsDateString()
  timestamp: Date;

  @ApiPropertyOptional({
    description: '事件热度值，范围1-10，数值越高表示关注度越高',
    example: 7,
    minimum: 1,
    maximum: 10,
    default: 1,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(10)
  hotness?: number;

  @ApiPropertyOptional({
    description: '事件相关标签',
    example: ['交通事故', '紧急事件', '社会关注'],
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
