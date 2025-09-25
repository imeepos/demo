import { ApiProperty } from '@nestjs/swagger';

export class MediaTypeResponseDto {
  @ApiProperty({
    description: '媒体类型唯一标识',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '媒体类型代码',
    example: 'government',
  })
  code: string;

  @ApiProperty({
    description: '媒体类型名称',
    example: '政府部门',
  })
  name: string;

  @ApiProperty({
    description: 'UI显示颜色代码',
    example: '#4caf50',
  })
  color?: string;

  @ApiProperty({
    description: '可信度等级',
    example: 8,
  })
  credibilityLevel: number;

  @ApiProperty({
    description: '是否启用',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: '排序权重',
    example: 10,
  })
  sortOrder: number;

  @ApiProperty({
    description: '父级媒体类型ID',
    example: 1,
  })
  parentId?: number;
}
