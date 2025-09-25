import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaType } from '@sker/orm';
import { CreateMediaTypeDto } from './dto/create-media-type.dto';
import { UpdateMediaTypeDto } from './dto/update-media-type.dto';
import { QueryMediaTypeDto } from './dto/query-media-type.dto';
import { MediaTypeResponseDto } from './dto/media-type-response.dto';

@Injectable()
export class MediaTypeService {
  constructor(
    @InjectRepository(MediaType)
    private readonly mediaTypeRepository: Repository<MediaType>,
  ) {}

  async create(createMediaTypeDto: CreateMediaTypeDto): Promise<MediaType> {
    const existingMediaType = await this.mediaTypeRepository.findOne({
      where: { code: createMediaTypeDto.code },
    });

    if (existingMediaType) {
      throw new ConflictException(
        `MediaType with code '${createMediaTypeDto.code}' already exists`,
      );
    }

    const mediaType = this.mediaTypeRepository.create({
      ...createMediaTypeDto,
      credibilityLevel: createMediaTypeDto.credibilityLevel ?? 5,
      isActive: createMediaTypeDto.isActive ?? true,
      sortOrder: createMediaTypeDto.sortOrder ?? 0,
    });
    return await this.mediaTypeRepository.save(mediaType);
  }

  async findAll(): Promise<MediaTypeResponseDto[]> {
    const mediaTypes = await this.mediaTypeRepository.find({
      select: [
        'id',
        'code',
        'name',
        'color',
        'credibilityLevel',
        'isActive',
        'sortOrder',
        'parentId',
      ],
      order: {
        sortOrder: 'DESC',
        id: 'ASC',
      },
    });

    return mediaTypes.map((mediaType) => ({
      id: mediaType.id,
      code: mediaType.code,
      name: mediaType.name,
      color: mediaType.color,
      credibilityLevel: mediaType.credibilityLevel,
      isActive: mediaType.isActive,
      sortOrder: mediaType.sortOrder,
      parentId: mediaType.parentId,
    }));
  }

  async findOne(id: number): Promise<MediaType> {
    const mediaType = await this.mediaTypeRepository.findOne({
      where: { id },
    });

    if (!mediaType) {
      throw new NotFoundException(`MediaType with ID ${id} not found`);
    }

    return mediaType;
  }

  async search(queryDto: QueryMediaTypeDto): Promise<MediaType[]> {
    const queryBuilder =
      this.mediaTypeRepository.createQueryBuilder('mediaType');

    if (queryDto.name) {
      queryBuilder.andWhere('mediaType.name LIKE :name', {
        name: `%${queryDto.name}%`,
      });
    }

    if (queryDto.code) {
      queryBuilder.andWhere('mediaType.code = :code', {
        code: queryDto.code,
      });
    }

    if (queryDto.isActive !== undefined) {
      queryBuilder.andWhere('mediaType.isActive = :isActive', {
        isActive: queryDto.isActive,
      });
    }

    if (queryDto.minCredibilityLevel !== undefined) {
      queryBuilder.andWhere(
        'mediaType.credibilityLevel >= :minCredibilityLevel',
        {
          minCredibilityLevel: queryDto.minCredibilityLevel,
        },
      );
    }

    if (queryDto.maxCredibilityLevel !== undefined) {
      queryBuilder.andWhere(
        'mediaType.credibilityLevel <= :maxCredibilityLevel',
        {
          maxCredibilityLevel: queryDto.maxCredibilityLevel,
        },
      );
    }

    if (queryDto.parentId !== undefined) {
      queryBuilder.andWhere('mediaType.parentId = :parentId', {
        parentId: queryDto.parentId,
      });
    }

    queryBuilder
      .orderBy('mediaType.sortOrder', 'DESC')
      .addOrderBy('mediaType.id', 'ASC');

    return await queryBuilder.getMany();
  }

  async update(
    id: number,
    updateMediaTypeDto: UpdateMediaTypeDto,
  ): Promise<MediaType> {
    const existingMediaType = await this.findOne(id);

    if (
      updateMediaTypeDto.code &&
      updateMediaTypeDto.code !== existingMediaType.code
    ) {
      const duplicateMediaType = await this.mediaTypeRepository.findOne({
        where: { code: updateMediaTypeDto.code },
      });

      if (duplicateMediaType) {
        throw new ConflictException(
          `MediaType with code '${updateMediaTypeDto.code}' already exists`,
        );
      }
    }

    const updatedMediaType = this.mediaTypeRepository.merge(
      existingMediaType,
      updateMediaTypeDto,
    );
    return await this.mediaTypeRepository.save(updatedMediaType);
  }

  async remove(id: number): Promise<void> {
    const mediaType = await this.findOne(id);
    await this.mediaTypeRepository.remove(mediaType);
  }
}
