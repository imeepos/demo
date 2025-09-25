import 'reflect-metadata';

// Global test setup
beforeAll(async () => {
  // Setup code that runs before all tests
});

afterAll(async () => {
  // Cleanup code that runs after all tests
});

// Mock console methods in test environment
global.console = {
  ...console,
  // Uncomment if you want to suppress logs in tests
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Set longer timeout for integration tests
jest.setTimeout(30000);
