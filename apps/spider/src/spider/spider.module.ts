import { Module } from '@nestjs/common';
import { SpiderController } from './spider.controller';
import { SpiderService } from './spider.service';
import { MessagePublisherService } from './message-publisher.service';

@Module({
  controllers: [SpiderController],
  providers: [SpiderService, MessagePublisherService],
  exports: [SpiderService, MessagePublisherService],
})
export class SpiderModule {}
