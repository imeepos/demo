import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from '@sker/orm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SentimentIntensityModule } from './sentiment-intensity/sentiment-intensity.module';
import { SentimentModule } from './sentiment/sentiment.module';
import { SentimentEventModule } from './sentiment-event/sentiment-event.module';
import { EventTypeModule } from './event-type/event-type.module';
import { MediaTypeModule } from './media-type/media-type.module';
import { OpenAIModule } from './openai';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getDatabaseConfig(configService),
    }),
    OpenAIModule,
    SentimentModule,
    SentimentIntensityModule,
    SentimentEventModule,
    EventTypeModule,
    MediaTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
