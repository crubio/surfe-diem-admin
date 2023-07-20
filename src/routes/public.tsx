import { Login } from '@features/auth/routes/login';
import SiteHeader from '@features/ui/header';
import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <>
      <SiteHeader />
      <Container>
        <Login />
      </Container>
    </>
  )
}

export const publicRoutes = [
  {
    path: '/login',
    element: <App />,
    ErrorElement: <div>404 Not Found</div>,
  },
];