import {
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class QueryMediaTypeDto {
  @ApiPropertyOptional({
    description: '媒体类型名称模糊搜索',
    example: '政府',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: '媒体类型代码精确搜索',
    example: 'government',
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({
    description: '是否启用状态筛选',
    example: true,
    type: 'boolean',
  })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean;

  @ApiPropertyOptional({
    description: '可信度等级最小值，范围 1-10',
    example: 5,
    minimum: 1,
    maximum: 10,
    type: 'number',
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(10)
  @Type(() => Number)
  minCredibilityLevel?: number;

  @ApiPropertyOptional({
    description: '可信度等级最大值，范围 1-10',
    example: 10,
    minimum: 1,
    maximum: 10,
    type: 'number',
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(10)
  @Type(() => Number)
  maxCredibilityLevel?: number;

  @ApiPropertyOptional({
    description: '父级媒体类型ID筛选',
    example: 1,
    type: 'number',
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  parentId?: number;
}
