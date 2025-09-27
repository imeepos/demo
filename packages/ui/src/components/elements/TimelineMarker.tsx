'use client';

import * as React from 'react';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

interface TimelineMarkerProps {
  event: TimelineEvent;
  position?: 'left' | 'right' | 'center';
  showTime?: boolean;
  onClick?: (event: TimelineEvent) => void;
  className?: string;
}

interface TimelineEvent {
  id: string;
  timestamp: Date;
  title: string;
  description?: string;
  type: 'info' | 'warning' | 'success' | 'error';
  icon?: string;
}

const TimelineMarker = forwardRef<HTMLDivElement, TimelineMarkerProps>(
  (
    { event, position = 'left', showTime = true, onClick, className, ...props },
    ref
  ) => {
    const typeConfigs = {
      info: { color: 'bg-blue-500', icon: 'ℹ️' },
      warning: { color: 'bg-yellow-500', icon: '⚠️' },
      success: { color: 'bg-green-500', icon: '✅' },
      error: { color: 'bg-red-500', icon: '❌' },
    };

    const config = typeConfigs[event.type];

    return (
      <div
        className={cn(
          'flex items-start space-x-3',
          position === 'right' && 'flex-row-reverse space-x-reverse',
          onClick && 'cursor-pointer',
          className
        )}
        onClick={() => onClick?.(event)}
        ref={ref}
        {...props}
      >
        <div className="relative">
          <div
            className={cn(
              'w-3 h-3 rounded-full border-2 border-white shadow',
              config.color
            )}
          />
          <div className="absolute top-3 left-1/2 w-0.5 h-6 bg-gray-200 transform -translate-x-1/2" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-white border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <span>{event.icon || config.icon}</span>
                <h4 className="font-medium text-sm">{event.title}</h4>
              </div>

              {showTime && (
                <time className="text-xs text-muted-foreground">
                  {event.timestamp.toLocaleTimeString()}
                </time>
              )}
            </div>

            {event.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {event.description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

TimelineMarker.displayName = 'TimelineMarker';

export { TimelineMarker };
export type { TimelineMarkerProps, TimelineEvent };
