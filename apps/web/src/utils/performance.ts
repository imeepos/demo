import React from 'react';

/**
 * Performance monitoring utilities
 */

export class PerformanceMonitor {
  private measurements = new Map<string, number>();

  start(label: string): void {
    this.measurements.set(label, performance.now());
  }

  end(label: string): number {
    const startTime = this.measurements.get(label);
    if (!startTime) {
      console.warn(`No start time found for label: ${label}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.measurements.delete(label);

    if (import.meta.env.VITE_DEBUG_PERFORMANCE) {
      console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  measure<T>(label: string, fn: () => T): T {
    this.start(label);
    const result = fn();
    this.end(label);
    return result;
  }

  async measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.start(label);
    const result = await fn();
    this.end(label);
    return result;
  }
}

export const perf = new PerformanceMonitor();

/**
 * Debug performance hook
 */
export function usePerformanceDebug(componentName: string) {
  if (import.meta.env.VITE_DEBUG_RENDERING) {
    console.log(`🔄 ${componentName} rendered`);
  }
}

/**
 * Measure component render time
 */
export function withPerformanceTracking<P extends object>(
  Component: React.ComponentType<P>,
  displayName?: string,
) {
  const WrappedComponent = (props: P) => {
    const name = displayName || Component.displayName || Component.name;

    return perf.measure(`${name} render`, () => React.createElement(Component, props));
  };

  WrappedComponent.displayName = `withPerformanceTracking(${
    displayName || Component.displayName || Component.name
  })`;

  return WrappedComponent;
}
