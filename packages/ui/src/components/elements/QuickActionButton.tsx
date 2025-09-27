'use client';

import * as React from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Loader2 } from 'lucide-react';

interface ActionConfig {
  id: string;
  label: string;
  icon?: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
  shortcut?: string;
}

interface QuickActionButtonProps {
  primaryAction: ActionConfig;
  secondaryActions?: ActionConfig[];
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const QuickActionButton = forwardRef<HTMLDivElement, QuickActionButtonProps>(
  (
    {
      primaryAction,
      secondaryActions = [],
      size = 'default',
      variant = 'default',
      disabled = false,
      loading = false,
      className,
      ...props
    },
    ref
  ) => {
    if (secondaryActions.length === 0) {
      return (
        <div ref={ref} {...props}>
          <Button
            variant={variant}
            size={size}
            disabled={disabled || primaryAction.disabled}
            onClick={primaryAction.onClick}
            className={cn('space-x-1', className)}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : primaryAction.icon ? (
              <span>{primaryAction.icon}</span>
            ) : null}
            <span>{primaryAction.label}</span>
          </Button>
        </div>
      );
    }

    return (
      <div className={cn('flex', className)} ref={ref} {...props}>
        <Button
          variant={variant}
          size={size}
          disabled={disabled || primaryAction.disabled}
          onClick={primaryAction.onClick}
          className="rounded-r-none border-r-0"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : primaryAction.icon ? (
            <span className="mr-1">{primaryAction.icon}</span>
          ) : null}
          {primaryAction.label}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={variant}
              size={size}
              disabled={disabled}
              className="rounded-l-none px-2"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {secondaryActions.map(action => (
              <DropdownMenuItem
                key={action.id}
                onClick={action.onClick}
                disabled={action.disabled}
                className={cn(
                  action.destructive && 'text-red-600 focus:text-red-600'
                )}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
                {action.shortcut && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {action.shortcut}
                  </span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

QuickActionButton.displayName = 'QuickActionButton';

export { QuickActionButton, type ActionConfig, type QuickActionButtonProps };
