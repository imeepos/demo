import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SentimentModule } from './sentiment/sentiment.module';
import { DataCleanerModule } from './data-cleaner/data-cleaner.module';

@Module({
  imports: [SentimentModule, DataCleanerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
