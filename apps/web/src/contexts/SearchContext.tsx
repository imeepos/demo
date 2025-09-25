import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
  setIsSearching: (searching: boolean) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

/**
 * Hook to use search context
 * @throws {Error} When used outside of SearchProvider
 */
export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

/**
 * Search context provider component
 * Provides search state and actions to child components
 */
export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const value = useMemo<SearchContextType>(
    () => ({
      searchQuery,
      setSearchQuery,
      isSearching,
      setIsSearching,
      clearSearch,
    }),
    [searchQuery, isSearching]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
