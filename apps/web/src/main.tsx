import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
// Import QueryClient
import { queryClient } from './lib/query-client';
// Import SearchProvider
import { SearchProvider } from './contexts/SearchContext';

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
});

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

createRoot(container).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <RouterProvider router={router} />
        {/* 仅在开发环境中显示 React Query DevTools */}
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </SearchProvider>
    </QueryClientProvider>
  </StrictMode>
);
