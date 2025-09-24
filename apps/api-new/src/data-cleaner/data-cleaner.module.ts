import { Module } from '@nestjs/common';
import { DataCleanerController } from './data-cleaner.controller';
import { DataCleanerTestController } from './data-cleaner-test.controller';
import { DataCleanerService } from './data-cleaner.service';
import { MessagePublisherService } from './message-publisher.service';

@Module({
  controllers: [DataCleanerController, DataCleanerTestController],
  providers: [DataCleanerService, MessagePublisherService],
  exports: [DataCleanerService, MessagePublisherService],
})
export class DataCleanerModule {}
