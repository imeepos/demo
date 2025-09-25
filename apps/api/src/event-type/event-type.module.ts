import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventType } from '@sker/orm';
import { EventTypeService } from './event-type.service';
import { EventTypeController } from './event-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventType])],
  controllers: [EventTypeController],
  providers: [EventTypeService],
  exports: [EventTypeService],
})
export class EventTypeModule {}
