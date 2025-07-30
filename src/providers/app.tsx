import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthContext } from './auth';
import { useUser } from 'hooks/use-user';
import { Loading } from 'features/ui/loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthUser } from 'features/auth/types';
import { UseLocalStorage, PREFIX } from '@utils/storage';

type AppProviderProps = {
  children: React.ReactNode;
};

const ErrorFallback = () => {
  return(
    <div>App could not be loaded. Refresh the page.</div>
  )
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const { getItem } = UseLocalStorage();
  const token = getItem(`${PREFIX}token`);
  
  const { data, isLoading, isError } = useUser();
  const userData: AuthUser | null = data ? data : null;

  // If we have a token but the user query failed, treat as not authenticated
  const shouldShowLoading = token && isLoading && !isError;

  return(
    <React.Suspense
      fallback={
        <Loading text="Loading application..." />
      }
    >
      {shouldShowLoading ? (
        <Loading text="Loading user data..." />
      ) : (
        <AuthContext.Provider value={{ user: userData }}>
          <ToastContainer />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
          </ErrorBoundary>
        </AuthContext.Provider> 
      )}
    </React.Suspense>
  )
}