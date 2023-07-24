import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AuthContext } from './auth';
import { useUser } from 'hooks/use-user';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AppProviderProps = {
  children: React.ReactNode;
};

const ErrorFallback = () => {
  return(
    <div>App could not be loaded. Refresh the page.</div>
  )
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const {data, isLoading, isFetched} = useUser();
  const userData = data ? data : null;

  return(
    <React.Suspense
      fallback={
        <div>rendered by react suspense component</div>
      }
    >
      {isLoading && !isFetched ? (
        <div>
          <Spinner animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <AuthContext.Provider value={{user: userData}}>
          <ToastContainer />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
          </ErrorBoundary>
        </AuthContext.Provider> 
      )}
    </React.Suspense>
  )
}