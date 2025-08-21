import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import { AppProvider } from 'providers/app.tsx'
import { AppRoutes } from 'routes/index.tsx'
import { ErrorBoundary } from 'features/ui/error-boundary'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

// import auth from '@lib/auth'
// auth.login({
//   username: 'hashbrown@gmail.com',
//   password: 'wow',
// })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AppProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppProvider>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)
