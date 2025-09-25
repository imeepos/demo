import { Test, TestingModule } from '@nestjs/testing';
import { SentimentController } from './sentiment.controller';
import { SentimentService } from './sentiment.service';

describe('SentimentController', () => {
  let controller: SentimentController;

  const mockSentimentService = {
    getAllEvents: jest.fn(),
    getEventById: jest.fn(),
    getMetrics: jest.fn(),
    getHotWords: jest.fn(),
    getSentimentTableData: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SentimentController],
      providers: [
        {
          provide: SentimentService,
          useValue: mockSentimentService,
        },
      ],
    }).compile();

    controller = module.get<SentimentController>(SentimentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getAllEvents from service', () => {
    controller.getAllEvents();
    expect(mockSentimentService.getAllEvents).toHaveBeenCalled();
  });

  it('should call getEventById from service with correct id', () => {
    const testId = 'test-id';
    controller.getEventById(testId);
    expect(mockSentimentService.getEventById).toHaveBeenCalledWith(testId);
  });
});
