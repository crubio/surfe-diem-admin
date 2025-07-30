import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Alert, Button, Container } from 'react-bootstrap';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <Container className="py-5">
      <Alert variant="danger" className="text-center">
        <Alert.Heading>
          <i className="bi bi-exclamation-triangle me-2"></i>
          Something went wrong
        </Alert.Heading>
        <p>
          An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
        </p>
        <hr />
        <div className="d-flex justify-content-center gap-2">
          <Button variant="outline-danger" onClick={resetErrorBoundary}>
            <i className="bi bi-arrow-clockwise me-1"></i>
            Try Again
          </Button>
          <Button variant="outline-secondary" onClick={() => window.location.reload()}>
            <i className="bi bi-arrow-repeat me-1"></i>
            Refresh Page
          </Button>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-3">
            <summary>Error Details (Development)</summary>
            <pre className="mt-2 text-start small">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
      </Alert>
    </Container>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

export const ErrorBoundary = ({ 
  children, 
  fallback = ErrorFallback 
}: ErrorBoundaryProps) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback}
      onError={(error, errorInfo) => {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
          console.error('Error caught by boundary:', error, errorInfo);
        }
        // In production, you might want to send this to an error reporting service
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}; 