import { Test, TestingModule } from '@nestjs/testing';
import { DataCleanerController } from './data-cleaner.controller';
import { DataCleanerService } from './data-cleaner.service';
import { RawDataDto } from './dto/data-cleaner.dto';

describe('DataCleanerController', () => {
  let controller: DataCleanerController;

  const mockDataCleanerService = {
    cleanData: jest.fn(),
    cleanBatchData: jest.fn(),
    getDefaultConfig: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataCleanerController],
      providers: [
        {
          provide: DataCleanerService,
          useValue: mockDataCleanerService,
        },
      ],
    }).compile();

    controller = module.get<DataCleanerController>(DataCleanerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('cleanDataSync', () => {
    it('should call service cleanData method', async () => {
      const testData: RawDataDto = {
        id: 'test-1',
        source: 'test',
        content: 'test content',
        timestamp: new Date(),
      };

      const expectedResult = {
        id: 'test-1',
        source: 'test',
        cleanedContent: 'test content',
        originalContent: 'test content',
        cleaningRules: [],
        processedAt: new Date(),
        status: 'success' as const,
      };

      mockDataCleanerService.cleanData.mockReturnValue(expectedResult);

      const result = controller.cleanDataSync(testData);

      expect(mockDataCleanerService.cleanData).toHaveBeenCalledWith(testData);
      expect(result).toBe(expectedResult);
    });
  });

  describe('healthCheck', () => {
    it('should return health status', () => {
      const result = controller.healthCheck();

      expect(result.status).toBe('healthy');
      expect(result.service).toBe('data-cleaner');
      expect(result.timestamp).toBeDefined();
    });
  });

  describe('getCleaningConfig', () => {
    it('should return default config', () => {
      const mockConfig = {
        rules: [],
        options: {
          removeHtml: true,
          removeUrls: true,
          removeEmojis: false,
          normalizeWhitespace: true,
          removeSpecialChars: false,
          minLength: 10,
          maxLength: 5000,
        },
      };

      mockDataCleanerService.getDefaultConfig.mockReturnValue(mockConfig);

      const result = controller.getCleaningConfig();

      expect(mockDataCleanerService.getDefaultConfig).toHaveBeenCalled();
      expect(result).toBe(mockConfig);
    });
  });
});
