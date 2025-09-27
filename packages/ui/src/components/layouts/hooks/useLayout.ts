'use client';

import * as React from 'react';

/** 侧边栏配置项 */
interface SidebarConfig {
  /** 默认宽度 */
  defaultWidth: number;
  /** 最小宽度 */
  minWidth: number;
  /** 最大宽度 */
  maxWidth: number;
  /** 收起时宽度 */
  collapsedWidth: number;
  /** 默认是否收起 */
  defaultCollapsed: boolean;
}

/** 侧边栏状态 */
interface SidebarState {
  /** 是否收起 */
  collapsed: boolean;
  /** 当前宽度 */
  width: number;
  /** 是否移动端 */
  isMobile: boolean;
}

/** 布局配置 */
interface LayoutConfig {
  /** 侧边栏配置 */
  sidebar: SidebarConfig;
}

/** useLayout 返回值 */
interface UseLayoutReturn {
  /** 侧边栏状态 */
  sidebarState: SidebarState;
  /** 操作方法 */
  actions: {
    /** 切换侧边栏收起/展开 */
    toggleSidebar: () => void;
    /** 设置侧边栏宽度 */
    setSidebarWidth: (width: number) => void;
    /** 防抖设置侧边栏宽度 */
    debouncedSetSidebarWidth: (width: number) => void;
  };
  /** 响应式相关 */
  responsive: {
    /** 是否移动端 */
    isMobile: boolean;
  };
  /** 无障碍访问 */
  accessibility: {
    /** 通知状态变化 */
    announceChange: (message: string) => void;
    /** 获取 ARIA 属性 */
    getAriaAttributes: () => Record<string, string>;
  };
}

/** 媒体查询 Hook */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

/** 防抖 Hook */
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * 布局管理 Hook
 * @param initialConfig 初始配置
 * @param onSidebarToggle 侧边栏切换回调
 */
export const useLayout = (
  initialConfig?: Partial<LayoutConfig>,
  onSidebarToggle?: (collapsed: boolean) => void
): UseLayoutReturn => {
  /** 合并默认配置 */
  const config = React.useMemo(
    () => ({
      sidebar: {
        defaultWidth: 280,
        minWidth: 240,
        maxWidth: 400,
        collapsedWidth: 64,
        defaultCollapsed: false,
        ...initialConfig?.sidebar,
      },
    }),
    [initialConfig]
  );

  /** 检测移动端 */
  const isMobile = useMediaQuery('(max-width: 767px)');

  /** 侧边栏状态 */
  const [sidebarState, setSidebarState] = React.useState<SidebarState>({
    collapsed: config.sidebar.defaultCollapsed || isMobile,
    width: config.sidebar.defaultWidth,
    isMobile,
  });

  /** 响应移动端变化 */
  React.useEffect(() => {
    setSidebarState(prev => ({
      ...prev,
      isMobile,
      collapsed: isMobile || prev.collapsed,
    }));
  }, [isMobile]);

  /** 切换侧边栏 */
  const toggleSidebar = React.useCallback(() => {
    if (isMobile) return;

    const newCollapsed = !sidebarState.collapsed;
    setSidebarState(prev => ({ ...prev, collapsed: newCollapsed }));
    onSidebarToggle?.(newCollapsed);
  }, [sidebarState.collapsed, isMobile, onSidebarToggle]);

  /** 设置侧边栏宽度（带防抖） */
  const setSidebarWidth = React.useCallback(
    (width: number) => {
      const clampedWidth = Math.max(
        config.sidebar.minWidth,
        Math.min(config.sidebar.maxWidth, width)
      );
      setSidebarState(prev => ({ ...prev, width: clampedWidth }));
    },
    [config.sidebar.minWidth, config.sidebar.maxWidth]
  );

  /** 防抖的宽度设置 */
  const debouncedSetSidebarWidth = React.useCallback(
    React.useMemo(() => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return (width: number) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => setSidebarWidth(width), 100);
      };
    }, [setSidebarWidth]),
    [setSidebarWidth]
  );

  /** 通知状态变化（无障碍访问） */
  const announceChange = React.useCallback((message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;

    document.body.appendChild(announcement);
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  /** 获取 ARIA 属性 */
  const getAriaAttributes = React.useMemo(
    () => ({
      'aria-expanded': sidebarState.collapsed ? 'false' : 'true',
      'aria-label': sidebarState.collapsed ? '展开侧边栏' : '收起侧边栏',
    }),
    [sidebarState.collapsed]
  );

  /** 缓存的 actions 对象 */
  const actions = React.useMemo(
    () => ({
      toggleSidebar,
      setSidebarWidth,
      debouncedSetSidebarWidth,
    }),
    [toggleSidebar, setSidebarWidth, debouncedSetSidebarWidth]
  );

  /** 缓存的 responsive 对象 */
  const responsive = React.useMemo(
    () => ({
      isMobile,
    }),
    [isMobile]
  );

  /** 缓存的 accessibility 对象 */
  const accessibility = React.useMemo(
    () => ({
      announceChange,
      getAriaAttributes: () => getAriaAttributes,
    }),
    [announceChange, getAriaAttributes]
  );

  return React.useMemo(
    () => ({
      sidebarState,
      actions,
      responsive,
      accessibility,
    }),
    [sidebarState, actions, responsive, accessibility]
  );
};
