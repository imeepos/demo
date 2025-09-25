import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QuerySentimentIntensityDto {
  @ApiPropertyOptional({
    description: '按标题模糊搜索',
    example: '积极',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: '情感强度最小值（区间搜索）',
    example: 0.3,
    minimum: 0,
    maximum: 1,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  minIntensity?: number;

  @ApiPropertyOptional({
    description: '情感强度最大值（区间搜索）',
    example: 0.8,
    minimum: 0,
    maximum: 1,
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  maxIntensity?: number;
}
