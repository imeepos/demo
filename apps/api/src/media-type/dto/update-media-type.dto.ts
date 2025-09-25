import { PartialType } from '@nestjs/swagger';
import { CreateMediaTypeDto } from './create-media-type.dto';

export class UpdateMediaTypeDto extends PartialType(CreateMediaTypeDto) {}
