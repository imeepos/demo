import { create } from 'zustand';
import type { SentimentIntensityItem } from '../types/sentiment-intensity';

interface SentimentIntensityState {
  // 列表状态
  items: SentimentIntensityItem[];
  isLoading: boolean;
  error: string | null;

  // 搜索状态
  searchTitle: string;
  searchMinIntensity: number | null;
  searchMaxIntensity: number | null;

  // 弹窗状态
  isCreateDialogOpen: boolean;
  isEditDialogOpen: boolean;
  editingItem: SentimentIntensityItem | null;

  // Actions
  setItems: (items: SentimentIntensityItem[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // 搜索 Actions
  setSearchTitle: (title: string) => void;
  setSearchMinIntensity: (minIntensity: number | null) => void;
  setSearchMaxIntensity: (maxIntensity: number | null) => void;
  clearSearch: () => void;

  // 弹窗 Actions
  openCreateDialog: () => void;
  closeCreateDialog: () => void;
  openEditDialog: (item: SentimentIntensityItem) => void;
  closeEditDialog: () => void;
}

export const useSentimentIntensityStore = create<SentimentIntensityState>(
  set => ({
    // 初始状态
    items: [],
    isLoading: false,
    error: null,

    searchTitle: '',
    searchMinIntensity: null,
    searchMaxIntensity: null,

    isCreateDialogOpen: false,
    isEditDialogOpen: false,
    editingItem: null,

    // 基础 Actions
    setItems: items => set({ items }),
    setLoading: isLoading => set({ isLoading }),
    setError: error => set({ error }),

    // 搜索 Actions
    setSearchTitle: searchTitle => set({ searchTitle }),
    setSearchMinIntensity: searchMinIntensity => set({ searchMinIntensity }),
    setSearchMaxIntensity: searchMaxIntensity => set({ searchMaxIntensity }),
    clearSearch: () =>
      set({
        searchTitle: '',
        searchMinIntensity: null,
        searchMaxIntensity: null,
      }),

    // 弹窗 Actions
    openCreateDialog: () => set({ isCreateDialogOpen: true }),
    closeCreateDialog: () => set({ isCreateDialogOpen: false }),
    openEditDialog: editingItem => set({ isEditDialogOpen: true, editingItem }),
    closeEditDialog: () => set({ isEditDialogOpen: false, editingItem: null }),
  })
);
