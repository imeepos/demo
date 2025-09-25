import { ApiProperty } from '@nestjs/swagger';

export class EventTypeResponseDto {
  @ApiProperty({
    description: '事件类型唯一标识',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '事件类型代码',
    example: 'political',
  })
  code: string;

  @ApiProperty({
    description: '事件类型名称',
    example: '政治事件',
  })
  name: string;

  @ApiProperty({
    description: 'UI显示颜色代码',
    example: '#ff6b6b',
  })
  color?: string;

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
}
