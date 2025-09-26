import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent, AgentExecution } from '@sker/orm';
import { OpenAIService } from './services/openai.service';
import { AgentController } from './controllers/agent.controller';
import { AgentExecutionController } from './controllers/agent-execution.controller';
import openaiConfig from './config/openai.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Agent, AgentExecution]),
    ConfigModule.forFeature(openaiConfig),
  ],
  controllers: [AgentController, AgentExecutionController],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
