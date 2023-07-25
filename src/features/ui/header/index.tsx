import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {APP_ROUTES} from '../../../utils/routing'

function SiteHeader() {
    return (
        <>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand>
              <Nav.Link href={APP_ROUTES.HOME}>surfe-diem-admin</Nav.Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href={APP_ROUTES.LOCATIONS}>Locations</Nav.Link>
                  <Nav.Link href={APP_ROUTES.SUMMARIES}>Wave Summaries</Nav.Link>
                  <Nav.Link href={APP_ROUTES.USERS}>Users</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
    );
}

export default SiteHeader;