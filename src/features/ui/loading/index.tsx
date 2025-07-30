import { Spinner } from 'react-bootstrap';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
}

export const Loading = ({ 
  size = 'md', 
  text = 'Loading...', 
  variant = 'primary' 
}: LoadingProps) => {
  const spinnerSize = size === 'sm' ? 'sm' : size === 'lg' ? undefined : undefined;
  
  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4">
      <Spinner 
        animation="border" 
        role="status" 
        size={spinnerSize}
        variant={variant}
      >
        <span className="visually-hidden">{text}</span>
      </Spinner>
      {text && <span className="mt-2 text-muted">{text}</span>}
    </div>
  );
};

export const LoadingOverlay = ({ text = 'Loading...' }: { text?: string }) => {
  return (
    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75">
      <Loading text={text} />
    </div>
  );
}; 