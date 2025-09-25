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
import { CreateMediaTypeDto } from './dto/create-media-type.dto';
import { QueryMediaTypeDto } from './dto/query-media-type.dto';
import { MediaTypeResponseDto } from './dto/media-type-response.dto';
import { UpdateMediaTypeDto } from './dto/update-media-type.dto';
import { MediaTypeService } from './media-type.service';

@ApiTags('media-type')
@Controller('media-type')
export class MediaTypeController {
  constructor(private readonly mediaTypeService: MediaTypeService) {}

  @Post()
  @ApiOperation({
    summary: '创建媒体类型',
    description:
      '创建新的媒体类型，用于分类舆情事件的媒体来源，支持政府部门、自媒体、企业等不同类别',
  })
  @ApiBody({ type: CreateMediaTypeDto })
  @ApiResponse({
    status: 201,
    description: '成功创建媒体类型',
    type: CreateMediaTypeDto,
  })
  @ApiResponse({
    status: 400,
    description: '请求参数验证失败',
  })
  @ApiResponse({
    status: 409,
    description: '媒体类型代码已存在',
  })
  create(@Body() createMediaTypeDto: CreateMediaTypeDto) {
    return this.mediaTypeService.create(createMediaTypeDto);
  }

  @Get()
  @ApiOperation({
    summary: '获取所有媒体类型',
    description: '获取系统中所有媒体类型，返回简化数据，按排序权重降序排列',
  })
  @ApiResponse({
    status: 200,
    description: '成功获取媒体类型列表',
    type: [MediaTypeResponseDto],
  })
  findAll() {
    return this.mediaTypeService.findAll();
  }

  @Get('search')
  @ApiOperation({
    summary: '搜索媒体类型',
    description: '根据名称、代码、启用状态、可信度等级等条件搜索媒体类型',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: '按名称模糊搜索',
    example: '政府',
  })
  @ApiQuery({
    name: 'code',
    required: false,
    description: '按代码精确搜索',
    example: 'government',
  })
  @ApiQuery({
    name: 'isActive',
    required: false,
    description: '按启用状态筛选',
    example: true,
    type: Boolean,
  })
  @ApiQuery({
    name: 'minCredibilityLevel',
    required: false,
    description: '可信度等级最小值（区间搜索）',
    example: 5,
    type: Number,
  })
  @ApiQuery({
    name: 'maxCredibilityLevel',
    required: false,
    description: '可信度等级最大值（区间搜索）',
    example: 10,
    type: Number,
  })
  @ApiQuery({
    name: 'parentId',
    required: false,
    description: '按父级媒体类型ID筛选',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: '成功获取搜索结果',
    type: [CreateMediaTypeDto],
  })
  search(@Query() queryMediaTypeDto: QueryMediaTypeDto) {
    return this.mediaTypeService.search(queryMediaTypeDto);
  }

  @Get(':id')
  @ApiOperation({
    summary: '获取单个媒体类型',
    description: '根据ID获取指定媒体类型的完整信息',
  })
  @ApiParam({
    name: 'id',
    description: '媒体类型的唯一标识符',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '成功获取媒体类型',
    type: CreateMediaTypeDto,
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定ID的媒体类型',
  })
  findOne(@Param('id') id: string) {
    return this.mediaTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新媒体类型',
    description: '根据ID更新指定的媒体类型信息',
  })
  @ApiParam({
    name: 'id',
    description: '媒体类型的唯一标识符',
    example: 1,
  })
  @ApiBody({ type: UpdateMediaTypeDto })
  @ApiResponse({
    status: 200,
    description: '成功更新媒体类型',
    type: CreateMediaTypeDto,
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定ID的媒体类型',
  })
  @ApiResponse({
    status: 409,
    description: '媒体类型代码已存在',
  })
  update(
    @Param('id') id: string,
    @Body() updateMediaTypeDto: UpdateMediaTypeDto,
  ) {
    return this.mediaTypeService.update(+id, updateMediaTypeDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除媒体类型',
    description: '根据ID删除指定的媒体类型',
  })
  @ApiParam({
    name: 'id',
    description: '媒体类型的唯一标识符',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: '成功删除媒体类型',
  })
  @ApiResponse({
    status: 404,
    description: '未找到指定ID的媒体类型',
  })
  remove(@Param('id') id: string) {
    return this.mediaTypeService.remove(+id);
  }
}
