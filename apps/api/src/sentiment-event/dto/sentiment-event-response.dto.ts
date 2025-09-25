import { ApiProperty } from '@nestjs/swagger';

export class SentimentEventResponseDto {
  @ApiProperty({
    description: '事件唯一标识符',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '事件标题',
    example: '某地发生重大交通事故',
  })
  title: string;

  @ApiProperty({
    description: '情感分数，范围 0.00 到 1.00',
    example: 0.25,
  })
  score: number;

  @ApiProperty({
    description: '信息来源媒体或平台',
    example: '新浪微博',
  })
  source: string;

  @ApiProperty({
    description: '事件发生的时间戳',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: Date;
}
