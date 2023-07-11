import { Outlet } from 'react-router';
import SiteHeader from '@features/ui/header';
import Container from 'react-bootstrap/esm/Container';
import MakeBreadCrumbs from '@features/ui/breadcrumbs';

function Dashboard(): JSX.Element {
    return (
      <>
        <SiteHeader />
        <Container>
          {MakeBreadCrumbs()}
          <Outlet />
        </Container>
      </>
    )
}

export default Dashboard;