import {
  IsString,
  IsBoolean,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Length,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMediaTypeDto {
  @ApiProperty({
    description: '媒体类型代码，如 government, self_media',
    example: 'government',
    minLength: 1,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  code: string;

  @ApiProperty({
    description: '媒体类型名称，如 政府部门, 自媒体',
    example: '政府部门',
    minLength: 1,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @ApiPropertyOptional({
    description: '媒体类型详细描述',
    example: '政府机关、事业单位等官方媒体平台',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'UI显示颜色代码，如 #ff6b6b',
    example: '#4caf50',
    maxLength: 20,
  })
  @IsString()
  @IsOptional()
  @Length(0, 20)
  color?: string;

  @ApiPropertyOptional({
    description: '可信度等级 1-10，数值越高可信度越高',
    example: 8,
    minimum: 1,
    maximum: 10,
    default: 5,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(10)
  credibilityLevel?: number;

  @ApiPropertyOptional({
    description: '是否启用该媒体类型',
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

  @ApiPropertyOptional({
    description: '父级媒体类型ID，支持层级分类',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  parentId?: number;
}
