import { Module } from '@nestjs/common';
import { SpiderModule } from './spider/spider.module';

@Module({
  imports: [SpiderModule],
})
export class AppModule {}