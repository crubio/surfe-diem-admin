import PublicApp from '@features/auth/routes/public';

export const publicRoutes = [
  {
    path: '/login',
    element: <PublicApp />,
    ErrorElement: <div>404 Not Found</div>,
  },
];