import { Module } from '@nestjs/common';
import { DataCleanerController } from './data-cleaner.controller';
import { DataCleanerService } from './data-cleaner.service';
import { MessagePublisherService } from './message-publisher.service';

@Module({
  controllers: [DataCleanerController],
  providers: [DataCleanerService, MessagePublisherService],
  exports: [DataCleanerService, MessagePublisherService],
})
export class DataCleanerModule {}
