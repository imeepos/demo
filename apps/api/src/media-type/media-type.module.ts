import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaType } from '@sker/orm';
import { MediaTypeService } from './media-type.service';
import { MediaTypeController } from './media-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MediaType])],
  controllers: [MediaTypeController],
  providers: [MediaTypeService],
  exports: [MediaTypeService],
})
export class MediaTypeModule {}
