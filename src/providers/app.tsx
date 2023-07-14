import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {} from '@lib/auth'

type AppProviderProps = {
  children: React.ReactNode;
};

const ErrorFallback = () => {
  return(
    <div>App could not be loaded. Refresh the page.</div>
  )
}

// TODO: add notification component to app provider
export const AppProvider = ({ children }: AppProviderProps) => {
  return(
    <React.Suspense
      fallback={
        <div>rendered by react suspense component</div>
      }
      
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {children}
      </ErrorBoundary>
    </React.Suspense>
  )
}