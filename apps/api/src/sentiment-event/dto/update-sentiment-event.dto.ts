import { PartialType } from '@nestjs/swagger';
import { CreateSentimentEventDto } from './create-sentiment-event.dto';

export class UpdateSentimentEventDto extends PartialType(
  CreateSentimentEventDto,
) {}
