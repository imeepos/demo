'use client';

import { forwardRef } from 'react';
import { Badge } from '../ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { cn } from '../../lib/utils';

type SourceType = 'news' | 'social' | 'forum' | 'video' | 'blog';
type SourceSize = 'sm' | 'md' | 'lg';

interface SourceInfo {
  id: string;
  name: string;
  type: SourceType;
  url?: string;
  icon?: string;
  verified?: boolean;
  followers?: number;
}

interface SourceTagProps {
  source: SourceInfo;
  showIcon?: boolean;
  showDetails?: boolean;
  size?: SourceSize;
  onClick?: (source: SourceInfo) => void;
  className?: string;
}

const SourceTag = forwardRef<HTMLDivElement, SourceTagProps>(
  (
    {
      source,
      showIcon = true,
      showDetails = true,
      size = 'md',
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const sourceIcons = {
      news: '📰',
      social: '📱',
      forum: '💬',
      video: '📺',
      blog: '✍️',
    };

    const typeLabels = {
      news: '新闻媒体',
      social: '社交媒体',
      forum: '论坛社区',
      video: '视频平台',
      blog: '博客平台',
    };

    const sizeConfigs = {
      sm: {
        badge: 'text-xs px-2 py-0.5',
        icon: 'text-xs',
      },
      md: {
        badge: 'text-sm px-2.5 py-1',
        icon: 'text-sm',
      },
      lg: {
        badge: 'text-base px-3 py-1.5',
        icon: 'text-base',
      },
    };

    const sizeConfig = sizeConfigs[size];

    const handleClick = () => {
      if (onClick) {
        onClick(source);
      }
    };

    const formatFollowers = (count: number) => {
      if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
      }
      if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
      }
      return count.toLocaleString();
    };

    const content = (
      <div ref={ref} {...props}>
        <Badge
          variant="outline"
          className={cn(
            'inline-flex items-center space-x-1 transition-colors duration-200',
            sizeConfig.badge,
            onClick && 'cursor-pointer hover:bg-muted',
            className
          )}
          onClick={handleClick}
        >
          {showIcon && (
            <span className={cn('shrink-0', sizeConfig.icon)}>
              {source.icon || sourceIcons[source.type]}
            </span>
          )}

          <span className="font-medium">{source.name}</span>

          {source.verified && (
            <span className="text-blue-500 shrink-0" title="已验证">
              ✓
            </span>
          )}
        </Badge>
      </div>
    );

    if (showDetails) {
      return (
        <HoverCard>
          <HoverCardTrigger asChild>{content}</HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">
                  {source.icon || sourceIcons[source.type]}
                </span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">{source.name}</h4>
                    {source.verified && (
                      <span className="text-blue-500" title="已验证">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {typeLabels[source.type]}
                  </p>
                </div>
              </div>

              {source.followers && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">关注者</span>
                  <span className="font-medium">
                    {formatFollowers(source.followers)}
                  </span>
                </div>
              )}

              {source.url && (
                <div className="border-t pt-3">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary hover:underline"
                  >
                    访问来源
                    <span className="ml-1">↗</span>
                  </a>
                </div>
              )}
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    }

    return content;
  }
);

SourceTag.displayName = 'SourceTag';

export {
  SourceTag,
  type SourceTagProps,
  type SourceInfo,
  type SourceType,
  type SourceSize,
};
