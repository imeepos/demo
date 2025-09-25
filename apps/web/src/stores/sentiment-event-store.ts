import { create } from 'zustand';
import type { QuerySentimentEventInput } from '../types/sentiment-event';

interface SentimentEventStore {
  searchParams: QuerySentimentEventInput;
  setSearchParams: (params: QuerySentimentEventInput) => void;
  clearSearchParams: () => void;
}

export const useSentimentEventStore = create<SentimentEventStore>(set => ({
  searchParams: {},
  setSearchParams: params => set({ searchParams: params }),
  clearSearchParams: () => set({ searchParams: {} }),
}));
