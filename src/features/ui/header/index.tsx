import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/auth';
import { APP_ROUTES } from '../../../utils/routing';

function SiteHeader() {
    const { user } = useContext(AuthContext);

    return (
        <Navbar expand="lg" className="bg-primary bg-gradient text-white shadow-sm">
            <Container>
                <Navbar.Brand className="text-white fw-bold">
                    <i className="bi bi-water me-2"></i>
                    <Nav.Link href={APP_ROUTES.HOME} className="text-white p-0">
                        Surfe Diem Admin
                    </Nav.Link>
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-white" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href={APP_ROUTES.HOME} className="text-white">
                            <i className="bi bi-house me-1"></i>
                            Home
                        </Nav.Link>
                        <Nav.Link href="/dashboard" className="text-white">
                            <i className="bi bi-speedometer2 me-1"></i>
                            Dashboard
                        </Nav.Link>
                        <Nav.Link href={APP_ROUTES.LOCATIONS} className="text-white">
                            <i className="bi bi-geo-alt me-1"></i>
                            Locations
                        </Nav.Link>
                        <Nav.Link href={APP_ROUTES.SUMMARIES} className="text-white">
                            <i className="bi bi-graph-up me-1"></i>
                            Wave Summaries
                        </Nav.Link>
                        <Nav.Link href={APP_ROUTES.USERS} className="text-white">
                            <i className="bi bi-people me-1"></i>
                            Users
                        </Nav.Link>
                    </Nav>
                    
                    <Nav>
                        {user ? (
                            <Nav.Link className="text-white">
                                <i className="bi bi-person-circle me-1"></i>
                                {user.email}
                            </Nav.Link>
                        ) : (
                            <Nav.Link href={APP_ROUTES.LOGIN} className="text-white">
                                <i className="bi bi-box-arrow-in-right me-1"></i>
                                Login
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SiteHeader;