import { describe, expect, it } from 'vitest';

import { cn, debounce, formatDate } from './index';

describe('utils', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2023-12-25');
      const formatted = formatDate(date);
      expect(typeof formatted).toBe('string');
    });
  });

  describe('cn', () => {
    it('should combine class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
      expect(cn('class1', null, 'class2', false, undefined)).toBe(
        'class1 class2'
      );
      expect(cn()).toBe('');
    });
  });

  describe('debounce', () => {
    it('should debounce function calls', async () => {
      let callCount = 0;
      const debouncedFn = debounce(() => {
        callCount++;
      }, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(callCount).toBe(0);

      await new Promise(resolve => setTimeout(resolve, 150));
      expect(callCount).toBe(1);
    });
  });
});
