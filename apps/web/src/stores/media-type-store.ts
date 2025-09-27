/**
 * 媒体类型状态管理 Store
 *
 * 设计理念：
 * - 使用 Zustand 进行轻量级状态管理
 * - 集中管理搜索参数状态
 * - 提供清晰的状态操作方法
 * - 支持状态持久化和重置
 *
 * @author 专业前端开发艺术家
 * @version 1.0.0
 */

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { MediaTypeStore } from '../types/media-type';

/**
 * 媒体类型管理状态Store
 *
 * 功能特性：
 * - 搜索参数管理
 * - 状态清理机制
 * - 开发工具集成
 */
export const useMediaTypeStore = create<MediaTypeStore>()(
  devtools(
    (set, get) => ({
      // ==================== 搜索状态 ====================

      /** 按名称搜索 */
      searchName: '',

      /** 按代码搜索 */
      searchCode: '',

      // ==================== 状态操作方法 ====================

      /**
       * 设置搜索名称
       * @param name - 搜索的名称
       */
      setSearchName: (name: string) => {
        set({ searchName: name }, false, 'setSearchName');
      },

      /**
       * 设置搜索代码
       * @param code - 搜索的代码
       */
      setSearchCode: (code: string) => {
        set({ searchCode: code }, false, 'setSearchCode');
      },

      /**
       * 清除所有搜索条件
       */
      clearSearch: () => {
        set(
          {
            searchName: '',
            searchCode: '',
          },
          false,
          'clearSearch'
        );
      },
    }),
    {
      name: 'media-type-store',
      enabled: process.env.NODE_ENV === 'development',
    }
  )
);

// ==================== Store 辅助函数 ====================

/**
 * 获取当前搜索参数
 * @returns 当前的搜索参数对象
 */
export const getSearchParams = () => {
  const { searchName, searchCode } = useMediaTypeStore.getState();
  return {
    name: searchName || undefined,
    code: searchCode || undefined,
  };
};

/**
 * 检查是否有搜索条件
 * @returns 是否有任何搜索条件
 */
export const hasSearchConditions = () => {
  const { searchName, searchCode } = useMediaTypeStore.getState();
  return !!(searchName || searchCode);
};

/**
 * 重置Store到初始状态
 */
export const resetMediaTypeStore = () => {
  useMediaTypeStore.getState().clearSearch();
};
