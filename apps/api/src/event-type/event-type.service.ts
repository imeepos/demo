import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventType } from '@sker/orm';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { QueryEventTypeDto } from './dto/query-event-type.dto';
import { EventTypeResponseDto } from './dto/event-type-response.dto';

@Injectable()
export class EventTypeService {
  constructor(
    @InjectRepository(EventType)
    private readonly eventTypeRepository: Repository<EventType>,
  ) {}

  async create(createEventTypeDto: CreateEventTypeDto): Promise<EventType> {
    const existingEventType = await this.eventTypeRepository.findOne({
      where: { code: createEventTypeDto.code },
    });

    if (existingEventType) {
      throw new ConflictException(
        `EventType with code '${createEventTypeDto.code}' already exists`,
      );
    }

    const eventType = this.eventTypeRepository.create({
      ...createEventTypeDto,
      isActive: createEventTypeDto.isActive ?? true,
      sortOrder: createEventTypeDto.sortOrder ?? 0,
    });
    return await this.eventTypeRepository.save(eventType);
  }

  async findAll(): Promise<EventTypeResponseDto[]> {
    const eventTypes = await this.eventTypeRepository.find({
      select: ['id', 'code', 'name', 'color', 'isActive', 'sortOrder'],
      order: {
        sortOrder: 'DESC',
        id: 'ASC',
      },
    });

    return eventTypes.map((eventType) => ({
      id: eventType.id,
      code: eventType.code,
      name: eventType.name,
      color: eventType.color,
      isActive: eventType.isActive,
      sortOrder: eventType.sortOrder,
    }));
  }

  async findOne(id: number): Promise<EventType> {
    const eventType = await this.eventTypeRepository.findOne({
      where: { id },
    });

    if (!eventType) {
      throw new NotFoundException(`EventType with ID ${id} not found`);
    }

    return eventType;
  }

  async search(queryDto: QueryEventTypeDto): Promise<EventType[]> {
    const queryBuilder =
      this.eventTypeRepository.createQueryBuilder('eventType');

    if (queryDto.name) {
      queryBuilder.andWhere('eventType.name LIKE :name', {
        name: `%${queryDto.name}%`,
      });
    }

    if (queryDto.code) {
      queryBuilder.andWhere('eventType.code = :code', {
        code: queryDto.code,
      });
    }

    if (queryDto.isActive !== undefined) {
      queryBuilder.andWhere('eventType.isActive = :isActive', {
        isActive: queryDto.isActive,
      });
    }

    queryBuilder
      .orderBy('eventType.sortOrder', 'DESC')
      .addOrderBy('eventType.id', 'ASC');

    return await queryBuilder.getMany();
  }

  async update(
    id: number,
    updateEventTypeDto: UpdateEventTypeDto,
  ): Promise<EventType> {
    const existingEventType = await this.findOne(id);

    if (
      updateEventTypeDto.code &&
      updateEventTypeDto.code !== existingEventType.code
    ) {
      const duplicateEventType = await this.eventTypeRepository.findOne({
        where: { code: updateEventTypeDto.code },
      });

      if (duplicateEventType) {
        throw new ConflictException(
          `EventType with code '${updateEventTypeDto.code}' already exists`,
        );
      }
    }

    const updatedEventType = this.eventTypeRepository.merge(
      existingEventType,
      updateEventTypeDto,
    );
    return await this.eventTypeRepository.save(updatedEventType);
  }

  async remove(id: number): Promise<void> {
    const eventType = await this.findOne(id);
    await this.eventTypeRepository.remove(eventType);
  }
}
