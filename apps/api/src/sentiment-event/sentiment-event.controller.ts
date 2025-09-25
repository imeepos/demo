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
import { CreateSentimentEventDto } from './dto/create-sentiment-event.dto';
import { QuerySentimentEventDto } from './dto/query-sentiment-event.dto';
import { SentimentEventResponseDto } from './dto/sentiment-event-response.dto';
import { UpdateSentimentEventDto } from './dto/update-sentiment-event.dto';
import { SentimentEventService } from './sentiment-event.service';

@ApiTags('sentiment-event')
@Controller('sentiment-event')
export class SentimentEventController {
  constructor(private readonly sentimentEventService: SentimentEventService) {}

  @Post()
  @ApiOperation({
    summary: '创建舆情事件记录',
    description:
      '创建新的舆情事件记录，包含事件标题、内容、情感分数、地理位置等信息',
  })
  @ApiBody({ type: CreateSentimentEventDto })
  @ApiResponse({
    status: 201,
    description: '成功创建舆情事件记录',
    type: CreateSentimentEventDto,
  })
  @ApiResponse({
    status: 400,
    description: '请求参数验证失败',
  })
  create(@Body() createSentimentEventDto: CreateSentimentEventDto) {
    return this.sentimentEventService.create(createSentimentEventDto);
  }

  @Get()
  @ApiOperation({
    summary: '获取所有舆情事件记录',
    description:
      '获取系统中所有舆情事件记录，返回简化数据（仅包含id、title、score、source、timestamp字段），用于下拉选择等场景',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取舆情事件记录列表',
    type: [SentimentEventResponseDto],
  })
  findAll() {
    return this.sentimentEventService.findAll();
  }

  @Get('search')
  @ApiOperation({
    summary: '搜索舆情事件记录',
    description: '根据标题、情感分数区间、事件时间区间等条件搜索舆情事件记录',
  })
  @ApiQuery({
    name: 'title',
    required: false,
    description: '按标题模糊搜索',
    example: '交通事故',
  })
  @ApiQuery({
    name: 'minScore',
    required: false,
    description: '情感分数最小值（区间搜索）',
    example: 0.2,
    type: Number,
  })
  @ApiQuery({
    name: 'maxScore',
    required: false,
    description: '情感分数最大值（区间搜索）',
    example: 0.8,
    type: Number,
  })
  @ApiQuery({
    name: 'startTime',
    required: false,
    description: '事件开始时间（时间区间搜索）',
    example: '2024-01-01T00:00:00.000Z',
    type: Date,
  })
  @ApiQuery({
    name: 'endTime',
    required: false,
    description: '事件结束时间（时间区间搜索）',
    example: '2024-01-31T23:59:59.999Z',
    type: Date,
  })
  @ApiResponse({
    status: 200,
    description: '成功获取搜索结果',
    type: [CreateSentimentEventDto],
  })
  search(@Query() querySentimentEventDto: QuerySentimentEventDto) {
    return this.sentimentEventService.search(querySentimentEventDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: '获取单个舆情事件记录',
    description: '根据ID获取指定舆情事件的完整信息',
  })
  @ApiParam({
    name: 'id',
    description: '舆情事件记录的唯一标识符',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '成功获取舆情事件记录',
    type: CreateSentimentEventDto,
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定ID的舆情事件记录',
  })
  findOne(@Param('id') id: string) {
    return this.sentimentEventService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新舆情事件记录',
    description: '根据ID更新指定的舆情事件记录信息',
  })
  @ApiParam({
    name: 'id',
    description: '舆情事件记录的唯一标识符',
    example: 1,
  })
  @ApiBody({ type: UpdateSentimentEventDto })
  @ApiResponse({
    status: 200,
    description: '成功更新舆情事件记录',
    type: CreateSentimentEventDto,
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定ID的舆情事件记录',
  })
  update(
    @Param('id') id: string,
    @Body() updateSentimentEventDto: UpdateSentimentEventDto,
  ) {
    return this.sentimentEventService.update(+id, updateSentimentEventDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除舆情事件记录',
    description: '根据ID删除指定的舆情事件记录',
  })
  @ApiParam({
    name: 'id',
    description: '舆情事件记录的唯一标识符',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '成功删除舆情事件记录',
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定ID的舆情事件记录',
  })
  remove(@Param('id') id: string) {
    return this.sentimentEventService.remove(+id);
  }
}
