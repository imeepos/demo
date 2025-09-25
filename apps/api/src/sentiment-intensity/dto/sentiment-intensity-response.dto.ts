import { ApiProperty } from '@nestjs/swagger';

export class SentimentIntensityResponseDto {
  @ApiProperty({
    description: '情感强度记录ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '情感标题',
    example: '积极情感',
  })
  title: string;

  @ApiProperty({
    description: '情感强度值',
    example: 0.85,
    minimum: 0,
    maximum: 1,
  })
  intensity: number;
}
