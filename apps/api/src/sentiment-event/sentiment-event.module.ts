import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentimentEvent } from '@sker/orm';
import { SentimentEventService } from './sentiment-event.service';
import { SentimentEventController } from './sentiment-event.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SentimentEvent])],
  controllers: [SentimentEventController],
  providers: [SentimentEventService],
  exports: [SentimentEventService],
})
export class SentimentEventModule {}
