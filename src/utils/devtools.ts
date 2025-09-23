/* eslint-disable no-undef */
import React from 'react';

/**
 * Development tools and debugging utilities
 * Only loaded in development environment
 */

// Why Did You Render - React performance debugging
export const initWDYR = () => {
  if (import.meta.env.DEV && import.meta.env.VITE_DEBUG_RENDERING === 'true') {
    import('why-did-you-render').then(wdyr => {
      if (typeof window !== 'undefined') {
        wdyr.default(React, {
          trackAllPureComponents: true,
          trackHooks: true,
          logOnDifferentValues: true,
          collapseGroups: true,
          include: [/.*Component/], // Track components ending with "Component"
          exclude: [/^.*Provider$/], // Exclude providers
        });
      }
    });
  }
};

// React DevTools setup
export const setupReactDevTools = () => {
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_DEVTOOLS === 'true') {
    // Connect to React DevTools
    if (typeof window !== 'undefined') {
      // @ts-expect-error - React DevTools hook doesn't have proper types
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.onCommitFiberRoot = (
        id: number,
        root: unknown,
        priorityLevel?: number
      ) => {
        // eslint-disable-next-line no-console
        console.log('🔄 React render:', { id, root, priorityLevel });
      };
    }
  }
};

// Performance monitoring setup
export const setupPerformanceMonitoring = () => {
  if (
    import.meta.env.DEV &&
    import.meta.env.VITE_DEBUG_PERFORMANCE === 'true'
  ) {
    // Monitor LCP, FID, CLS
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            // eslint-disable-next-line no-console
            console.log('📊 LCP:', entry.startTime);
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            // eslint-disable-next-line no-console
            console.log('📊 FID:', entry.processingStart - entry.startTime);
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              // eslint-disable-next-line no-console
              console.log('📊 CLS:', entry.value);
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Performance monitoring setup failed:', error);
      }
    }
  }
};

// Memory usage monitoring
export const monitorMemoryUsage = () => {
  if (
    import.meta.env.DEV &&
    import.meta.env.VITE_DEBUG_PERFORMANCE === 'true'
  ) {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (
          performance as unknown as {
            memory: {
              usedJSHeapSize: number;
              totalJSHeapSize: number;
              limit: number;
            };
          }
        ).memory;
        // eslint-disable-next-line no-console
        console.log('💾 Memory:', {
          used: Math.round(memory.usedJSHeapSize / 1024 / 1024) + ' MB',
          total: Math.round(memory.totalJSHeapSize / 1024 / 1024) + ' MB',
          limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024) + ' MB',
        });
      }, 10000); // Every 10 seconds
    }
  }
};

// Initialize all dev tools
export const initDevTools = () => {
  initWDYR();
  setupReactDevTools();
  setupPerformanceMonitoring();
  monitorMemoryUsage();
};
