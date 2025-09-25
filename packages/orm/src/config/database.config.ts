import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SentimentEvent } from '../entities';
import { SentimentIntensity } from '../entities/SentimentIntensity';

export const getDatabaseConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST', 'localhost'),
  port: configService.get<number>('POSTGRES_PORT', 5433),
  username: configService.get<string>('POSTGRES_USER', 'postgres'),
  password: configService.get<string>('POSTGRES_PASSWORD', ''),
  database: configService.get<string>('POSTGRES_DB', 'sentiment_analysis'),
  entities: [SentimentIntensity, SentimentEvent],
  synchronize: configService.get<string>('NODE_ENV') !== 'production',
  logging: configService.get<string>('NODE_ENV') === 'development',
});
