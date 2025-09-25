import {
  IsString,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Length,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventTypeDto {
  @ApiProperty({
    description: '事件类型代码，如 political, economic',
    example: 'political',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  code: string;

  @ApiProperty({
    description: '事件类型名称，如 政治事件, 经济事件',
    example: '政治事件',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @ApiPropertyOptional({
    description: '事件类型详细描述',
    example: '涉及政治相关的舆情事件类型',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'UI显示颜色代码，如 #ff6b6b',
    example: '#ff6b6b',
    maxLength: 20,
  })
  @IsString()
  @IsOptional()
  @Length(0, 20)
  color?: string;

  @ApiPropertyOptional({
    description: '是否启用该事件类型',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: '排序权重，数值越大排序越靠前',
    example: 10,
    minimum: 0,
    default: 0,
  })
  @IsNumber()
  @IsOptional()
  @Min(0)
  sortOrder?: number;
}
