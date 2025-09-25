import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentimentIntensity } from '@sker/orm';
import { SentimentIntensityService } from './sentiment-intensity.service';
import { SentimentIntensityController } from './sentiment-intensity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SentimentIntensity])],
  controllers: [SentimentIntensityController],
  providers: [SentimentIntensityService],
  exports: [SentimentIntensityService],
})
export class SentimentIntensityModule {}
