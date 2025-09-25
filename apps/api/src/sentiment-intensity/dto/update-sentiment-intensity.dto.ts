import { PartialType } from '@nestjs/mapped-types';
import { CreateSentimentIntensityDto } from './create-sentiment-intensity.dto';

export class UpdateSentimentIntensityDto extends PartialType(
  CreateSentimentIntensityDto,
) {}
