import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent, AgentExecution } from '@sker/orm';
import { OpenAIService } from './services/openai.service';
import openaiConfig from './config/openai.config';

@Module({
  imports: [
    ConfigModule.forFeature(openaiConfig),
    TypeOrmModule.forFeature([Agent, AgentExecution]),
  ],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
