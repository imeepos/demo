import { Button } from '@sker/ui';
import { cn } from '@sker/ui';

interface SimplePageHeaderProps {
  /** 页面标题 */
  title: string;
  /** 页面描述 */
  description: string;
  /** 主要操作按钮文本 */
  primaryAction?: string;
  /** 主要操作按钮点击事件 */
  onPrimaryAction?: () => void;
  /** 额外样式类名 */
  className?: string;
}

/**
 * 简洁的页面头部组件
 *
 * 设计特点：
 * - 左侧垂直装饰线 + 标题描述
 * - 右侧主要操作按钮
 * - 使用主题色系，确保视觉一致性
 * - 响应式设计，适配不同屏幕尺寸
 */
export function SimplePageHeader({
  title,
  description,
  primaryAction,
  onPrimaryAction,
  className,
}: SimplePageHeaderProps) {
  return (
    <div className={cn('mb-8', className)}>
      <div className="flex items-center justify-between">
        {/* 左侧：标题区域 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            {/* 装饰性垂直线条 */}
            <div className="w-1 h-12 bg-gradient-to-b from-primary to-primary/80 rounded-full"></div>

            {/* 标题和描述 */}
            <div>
              <h1 className="text-2xl font-semibold text-foreground tracking-normal leading-tight">
                {title}
              </h1>
              <p className="text-muted-foreground text-sm font-medium mt-2">
                {description}
              </p>
            </div>
          </div>
        </div>

        {/* 右侧：操作按钮 */}
        {primaryAction && onPrimaryAction && (
          <Button
            onClick={onPrimaryAction}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <span className="text-sm">{primaryAction}</span>
          </Button>
        )}
      </div>
    </div>
  );
}
