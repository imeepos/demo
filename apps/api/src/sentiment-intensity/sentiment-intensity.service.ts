import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SentimentIntensity } from '@sker/orm';
import {
  Like,
  Repository,
  Between,
  MoreThanOrEqual,
  LessThanOrEqual,
} from 'typeorm';
import { CreateSentimentIntensityDto } from './dto/create-sentiment-intensity.dto';
import { QuerySentimentIntensityDto } from './dto/query-sentiment-intensity.dto';
import { SentimentIntensityResponseDto } from './dto/sentiment-intensity-response.dto';
import { UpdateSentimentIntensityDto } from './dto/update-sentiment-intensity.dto';

@Injectable()
export class SentimentIntensityService {
  constructor(
    @InjectRepository(SentimentIntensity)
    private sentimentIntensityRepository: Repository<SentimentIntensity>,
  ) {}

  async create(
    createSentimentIntensityDto: CreateSentimentIntensityDto,
  ): Promise<SentimentIntensity> {
    const sentimentIntensity = this.sentimentIntensityRepository.create(
      createSentimentIntensityDto,
    );
    return await this.sentimentIntensityRepository.save(sentimentIntensity);
  }

  async update(
    id: number,
    updateSentimentIntensityDto: UpdateSentimentIntensityDto,
  ): Promise<SentimentIntensity> {
    const existing = await this.findOne(id);

    const updated = this.sentimentIntensityRepository.merge(
      existing,
      updateSentimentIntensityDto,
    );
    return await this.sentimentIntensityRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const sentimentIntensity = await this.findOne(id);
    await this.sentimentIntensityRepository.remove(sentimentIntensity);
  }

  async findOne(id: number): Promise<SentimentIntensity> {
    const sentimentIntensity = await this.sentimentIntensityRepository.findOne({
      where: { id },
    });

    if (!sentimentIntensity) {
      throw new NotFoundException(`SentimentIntensity with ID ${id} not found`);
    }

    return sentimentIntensity;
  }

  async search(
    querySentimentIntensityDto: QuerySentimentIntensityDto,
  ): Promise<SentimentIntensity[]> {
    const where: any = {};

    if (querySentimentIntensityDto.title) {
      where.title = Like(`%${querySentimentIntensityDto.title}%`);
    }

    // 处理强度区间搜索
    const { minIntensity, maxIntensity } = querySentimentIntensityDto;

    if (minIntensity !== undefined && maxIntensity !== undefined) {
      // 同时提供最小值和最大值，使用区间搜索
      where.intensity = Between(minIntensity, maxIntensity);
    } else if (minIntensity !== undefined) {
      // 仅提供最小值，搜索大于等于最小值的记录
      where.intensity = MoreThanOrEqual(minIntensity);
    } else if (maxIntensity !== undefined) {
      // 仅提供最大值，搜索小于等于最大值的记录
      where.intensity = LessThanOrEqual(maxIntensity);
    }

    return await this.sentimentIntensityRepository.find({ where });
  }

  async findAll(): Promise<SentimentIntensityResponseDto[]> {
    const sentimentIntensities = await this.sentimentIntensityRepository.find({
      select: ['id', 'title', 'intensity'],
    });

    return sentimentIntensities.map((item) => ({
      id: item.id,
      title: item.title,
      intensity: item.intensity,
    }));
  }
}
