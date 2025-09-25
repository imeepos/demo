import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { QueryEventTypeDto } from './dto/query-event-type.dto';
import { EventTypeResponseDto } from './dto/event-type-response.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { EventTypeService } from './event-type.service';

@ApiTags('event-type')
@Controller('event-type')
export class EventTypeController {
  constructor(private readonly eventTypeService: EventTypeService) {}

  @Post()
  @ApiOperation({
    summary: '创建事件类型',
    description:
      '创建新的事件类型，用于分类舆情事件，支持政治、经济、社会等不同类别',
  })
  @ApiBody({ type: CreateEventTypeDto })
  @ApiResponse({
    status: 201,
    description: '成功创建事件类型',
    type: CreateEventTypeDto,
  })
  @ApiResponse({
    status: 400,
    description: '请求参数验证失败',
  })
  @ApiResponse({
    status: 409,
    description: '事件类型代码已存在',
  })
  create(@Body() createEventTypeDto: CreateEventTypeDto) {
    return this.eventTypeService.create(createEventTypeDto);
  }

  @Get()
  @ApiOperation({
    summary: '获取所有事件类型',
    description: '获取系统中所有事件类型，返回简化数据，按排序权重降序排列',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取事件类型列表',
    type: [EventTypeResponseDto],
  })
  findAll() {
    return this.eventTypeService.findAll();
  }

  @Get('search')
  @ApiOperation({
    summary: '搜索事件类型',
    description: '根据名称、代码、启用状态等条件搜索事件类型',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: '按名称模糊搜索',
    example: '政治',
  })
  @ApiQuery({
    name: 'code',
    required: false,
    description: '按代码精确搜索',
    example: 'political',
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: '按启用状态筛选',
    example: true,
    type: Boolean,
  })
  @ApiResponse({
    status: 200,
    description: '成功获取搜索结果',
    type: [CreateEventTypeDto],
  })
  search(@Query() queryEventTypeDto: QueryEventTypeDto) {
    return this.eventTypeService.search(queryEventTypeDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: '获取单个事件类型',
    description: '根据ID获取指定事件类型的完整信息',
  })
  @ApiParam({
    name: 'id',
    description: '事件类型的唯一标识符',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '成功获取事件类型',
    type: CreateEventTypeDto,
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定ID的事件类型',
  })
  findOne(@Param('id') id: string) {
    return this.eventTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新事件类型',
    description: '根据ID更新指定的事件类型信息',
  })
  @ApiParam({
    name: 'id',
    description: '事件类型的唯一标识符',
    example: 1,
  })
  @ApiBody({ type: UpdateEventTypeDto })
  @ApiResponse({
    status: 200,
    description: '成功更新事件类型',
    type: CreateEventTypeDto,
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定ID的事件类型',
  })
  @ApiResponse({
    status: 409,
    description: '事件类型代码已存在',
  })
  update(
    @Param('id') id: string,
    @Body() updateEventTypeDto: UpdateEventTypeDto,
  ) {
    return this.eventTypeService.update(+id, updateEventTypeDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除事件类型',
    description: '根据ID删除指定的事件类型',
  })
  @ApiParam({
    name: 'id',
    description: '事件类型的唯一标识符',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '成功删除事件类型',
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定ID的事件类型',
  })
  remove(@Param('id') id: string) {
    return this.eventTypeService.remove(+id);
  }
}
