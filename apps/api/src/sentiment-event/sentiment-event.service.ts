import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SentimentEvent } from '@sker/orm';
import { CreateSentimentEventDto } from './dto/create-sentiment-event.dto';
import { UpdateSentimentEventDto } from './dto/update-sentiment-event.dto';
import { QuerySentimentEventDto } from './dto/query-sentiment-event.dto';
import { SentimentEventResponseDto } from './dto/sentiment-event-response.dto';

@Injectable()
export class SentimentEventService {
  constructor(
    @InjectRepository(SentimentEvent)
    private readonly sentimentEventRepository: Repository<SentimentEvent>,
  ) {}

  async create(
    createSentimentEventDto: CreateSentimentEventDto,
  ): Promise<SentimentEvent> {
    const sentimentEvent = this.sentimentEventRepository.create({
      ...createSentimentEventDto,
      hotness: createSentimentEventDto.hotness ?? 1,
    });
    return await this.sentimentEventRepository.save(sentimentEvent);
  }

  async findAll(): Promise<SentimentEventResponseDto[]> {
    const events = await this.sentimentEventRepository.find({
      select: ['id', 'title', 'score', 'source', 'timestamp'],
      order: {
        timestamp: 'DESC',
      },
    });

    return events.map((event) => ({
      id: event.id,
      title: event.title,
      score: event.score,
      source: event.source,
      timestamp: event.timestamp,
    }));
  }

  async findOne(id: number): Promise<SentimentEvent> {
    const sentimentEvent = await this.sentimentEventRepository.findOne({
      where: { id },
    });

    if (!sentimentEvent) {
      throw new NotFoundException(`SentimentEvent with ID ${id} not found`);
    }

    return sentimentEvent;
  }

  async search(queryDto: QuerySentimentEventDto): Promise<SentimentEvent[]> {
    const queryBuilder =
      this.sentimentEventRepository.createQueryBuilder('event');

    if (queryDto.title) {
      queryBuilder.andWhere('event.title LIKE :title', {
        title: `%${queryDto.title}%`,
      });
    }

    if (queryDto.minScore !== undefined) {
      queryBuilder.andWhere('event.score >= :minScore', {
        minScore: queryDto.minScore,
      });
    }

    if (queryDto.maxScore !== undefined) {
      queryBuilder.andWhere('event.score <= :maxScore', {
        maxScore: queryDto.maxScore,
      });
    }

    if (queryDto.startTime) {
      queryBuilder.andWhere('event.timestamp >= :startTime', {
        startTime: queryDto.startTime,
      });
    }

    if (queryDto.endTime) {
      queryBuilder.andWhere('event.timestamp <= :endTime', {
        endTime: queryDto.endTime,
      });
    }

    queryBuilder.orderBy('event.timestamp', 'DESC');

    return await queryBuilder.getMany();
  }

  async update(
    id: number,
    updateSentimentEventDto: UpdateSentimentEventDto,
  ): Promise<SentimentEvent> {
    const existingEvent = await this.findOne(id);

    const updatedEvent = this.sentimentEventRepository.merge(
      existingEvent,
      updateSentimentEventDto,
    );
    return await this.sentimentEventRepository.save(updatedEvent);
  }

  async remove(id: number): Promise<void> {
    const sentimentEvent = await this.findOne(id);
    await this.sentimentEventRepository.remove(sentimentEvent);
  }
}
