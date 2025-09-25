import {
  IsString,
  IsNumber,
  IsNotEmpty,
  Min,
  Max,
  Length,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSentimentIntensityDto {
  @ApiProperty({
    description: '情感标题',
    example: '积极情感',
    minLength: 1,
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  title: string;

  @ApiProperty({
    description: '情感强度值，范围 0.00-1.00',
    example: 0.85,
    minimum: 0,
    maximum: 1,
    type: 'number',
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  intensity: number;

  @ApiPropertyOptional({
    description: '情感简介描述',
    example: '表示积极正面的情感倾向',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
