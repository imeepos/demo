import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './styles/index.css';

// 初始化API配置
import { configureApiClient } from './config/api';

// Import the generated route tree
import { SearchProvider } from './contexts/SearchContext';
import { queryClient } from './hooks/queryClient';
import { routeTree } from './routeTree.gen';

// 配置API客户端
configureApiClient();

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
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--card)',
              color: 'var(--foreground)',
              border: '1px solid var(--border)',
            },
          }}
        />
      </SearchProvider>
    </QueryClientProvider>
  </StrictMode>
);
