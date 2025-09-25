import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { SentimentIntensityService } from './sentiment-intensity.service';
import { CreateSentimentIntensityDto } from './dto/create-sentiment-intensity.dto';
import { UpdateSentimentIntensityDto } from './dto/update-sentiment-intensity.dto';
import { QuerySentimentIntensityDto } from './dto/query-sentiment-intensity.dto';
import { SentimentIntensityResponseDto } from './dto/sentiment-intensity-response.dto';

/**
 * 情感强度管理控制器
 * 负责处理情感强度相关的CRUD操作
 */
@ApiTags('sentiment-intensity')
@Controller('sentiment-intensity')
export class SentimentIntensityController {
  constructor(
    private readonly sentimentIntensityService: SentimentIntensityService,
  ) {}

  /**
   * 创建新的情感强度记录
   * POST /api/sentiment-intensity
   * @param createSentimentIntensityDto 创建情感强度的数据
   * @returns 创建的情感强度记录
   */
  @Post()
  @ApiOperation({
    summary: '创建情感强度记录',
    description: '创建新的情感强度记录，包含标题、强度值和可选的描述信息',
  })
  @ApiBody({ type: CreateSentimentIntensityDto })
  @ApiResponse({
    status: 201,
    description: '成功创建情感强度记录',
    type: CreateSentimentIntensityDto,
  })
  @ApiResponse({
    status: 400,
    description: '请求参数验证失败',
  })
  create(@Body() createSentimentIntensityDto: CreateSentimentIntensityDto) {
    return this.sentimentIntensityService.create(createSentimentIntensityDto);
  }

  /**
   * 获取所有情感强度记录
   * GET /api/sentiment-intensity
   * @returns 所有情感强度记录的简化列表（仅包含id、title、intensity字段）
   */
  @Get()
  @ApiOperation({
    summary: '获取所有情感强度记录',
    description:
      '获取系统中所有情感强度记录，返回简化数据（仅包含id、title、intensity字段）',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取情感强度记录列表',
    type: [SentimentIntensityResponseDto],
  })
  findAll() {
    return this.sentimentIntensityService.findAll();
  }

  /**
   * 搜索情感强度记录
   * GET /api/sentiment-intensity/search
   * @param querySentimentIntensityDto 搜索条件
   * @returns 匹配的情感强度记录列表
   */
  @Get('search')
  @ApiOperation({
    summary: '搜索情感强度记录',
    description: '根据标题和/或强度值搜索情感强度记录',
  })
  @ApiQuery({
    name: 'title',
    required: false,
    description: '按标题模糊搜索',
    example: '积极',
  })
  @ApiQuery({
    name: 'intensity',
    required: false,
    description: '按情感强度值精确搜索',
    example: 0.85,
  })
  @ApiResponse({
    status: 200,
    description: '成功获取搜索结果',
    type: [CreateSentimentIntensityDto],
  })
  search(@Query() querySentimentIntensityDto: QuerySentimentIntensityDto) {
    return this.sentimentIntensityService.search(querySentimentIntensityDto);
  }

  /**
   * 更新情感强度记录
   * PATCH /api/sentiment-intensity/:id
   * @param id 记录ID
   * @param updateSentimentIntensityDto 更新的数据
   * @returns 更新后的情感强度记录
   */
  @Patch(':id')
  @ApiOperation({
    summary: '更新情感强度记录',
    description: '根据ID更新指定的情感强度记录信息',
  })
  @ApiParam({
    name: 'id',
    description: '情感强度记录的唯一标识符',
    example: 1,
  })
  @ApiBody({ type: UpdateSentimentIntensityDto })
  @ApiResponse({
    status: 200,
    description: '成功更新情感强度记录',
    type: CreateSentimentIntensityDto,
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定ID的情感强度记录',
  })
  update(
    @Param('id') id: string,
    @Body() updateSentimentIntensityDto: UpdateSentimentIntensityDto,
  ) {
    return this.sentimentIntensityService.update(
      +id,
      updateSentimentIntensityDto,
    );
  }

  /**
   * 删除情感强度记录
   * DELETE /api/sentiment-intensity/:id
   * @param id 记录ID
   */
  @Delete(':id')
  @ApiOperation({
    summary: '删除情感强度记录',
    description: '根据ID删除指定的情感强度记录',
  })
  @ApiParam({
    name: 'id',
    description: '情感强度记录的唯一标识符',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '成功删除情感强度记录',
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定ID的情感强度记录',
  })
  remove(@Param('id') id: string) {
    return this.sentimentIntensityService.remove(+id);
  }
}
