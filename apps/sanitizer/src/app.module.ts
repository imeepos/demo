import { Module } from '@nestjs/common';
import { DataCleanerModule } from './data-cleaner/data-cleaner.module';

@Module({
  imports: [DataCleanerModule],
})
export class AppModule {}
