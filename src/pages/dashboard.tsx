import { Outlet } from 'react-router';
import SiteHeader from '@features/ui/header';
import Container from 'react-bootstrap/esm/Container';
import makeBreadCrumbs from '@features/ui/breadcrumbs';

function Dashboard(): JSX.Element {
    return (
      <>
        <SiteHeader />
        <Container>
          {makeBreadCrumbs()}
          <Outlet />
        </Container>
      </>
    )
}

export default Dashboard;