import { Login } from '@features/auth/routes/login';

export const publicRoutes = [
  {
    path: '/login',
    element: <Login />,
    ErrorElement: <div>404 Not Found</div>,
  },
];