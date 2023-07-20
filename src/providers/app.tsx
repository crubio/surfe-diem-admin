import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {} from '@lib/auth'
import { AuthContext } from './auth';
import { useUser } from 'hooks/use-user';

type AppProviderProps = {
  children: React.ReactNode;
};

const ErrorFallback = () => {
  return(
    <div>App could not be loaded. Refresh the page.</div>
  )
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const {data} = useUser();
  const userData = data ? data : null;

  return(
    <React.Suspense
      fallback={
        <div>rendered by react suspense component</div>
      }
    >
      <AuthContext.Provider value={{user: userData, setUser: () => {}}}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {children}
        </ErrorBoundary>
      </AuthContext.Provider>
    </React.Suspense>
  )
}