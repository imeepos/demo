import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SentimentIntensity } from '@sker/orm';
import { Like, Repository } from 'typeorm';
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
  ): Promise<SentimentIntensity | null> {
    await this.sentimentIntensityRepository.update(
      id,
      updateSentimentIntensityDto,
    );
    return await this.sentimentIntensityRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.sentimentIntensityRepository.delete(id);
  }

  async search(
    querySentimentIntensityDto: QuerySentimentIntensityDto,
  ): Promise<SentimentIntensity[]> {
    const where: any = {};

    if (querySentimentIntensityDto.title) {
      where.title = Like(`%${querySentimentIntensityDto.title}%`);
    }

    if (querySentimentIntensityDto.intensity !== undefined) {
      where.intensity = querySentimentIntensityDto.intensity;
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
