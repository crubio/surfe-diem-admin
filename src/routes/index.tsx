import { useRoutes } from 'react-router-dom';

// import { Landing } from '@/features/misc';
// import { useAuth } from '@/lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  // TODO: Uncomment this when auth is implemented
  // const auth = useAuth();
  const auth = true;

  const commonRoutes = [{ path: '/', element: <div>root</div>}];
  
  const routes = auth ? protectedRoutes : publicRoutes;

  const element = useRoutes([...commonRoutes, ...routes]);

  return (element)
};