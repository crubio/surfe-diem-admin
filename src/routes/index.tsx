import { useContext } from 'react';
import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { AuthContext } from 'providers/auth';
import { matchAll } from './match-all';

/**
 * Returns routes based on user authentication status
 * @returns ReactELement
 */
export const AppRoutes = () => {
  const {user} = useContext(AuthContext);
  
  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...matchAll]);

  return (element)
};