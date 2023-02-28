import { NavLink } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';


function Header() {
  const { user, logout } = useUser();

  return (
    <Navbar className="Header" collapseOnSelect expand="lg" bg="danger" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/explore"><h4>Sukimoku</h4></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/explore">Explore</Nav.Link>
            {user !== null &&
              <Nav.Link as={NavLink} to="/subscriptions">Subscriptions</Nav.Link>
            }
          </Nav>
            {user === undefined ?
              <Spinner animation='border' />
            :
              <>
                {user !== null ?
                <div className="justify-content-end">
                  <Nav>
                    <Image src={user.avatar_url + '&s=32'} roundedCircle />
                    <Nav.Link as={NavLink} to={"/user/" + user.id}>{user.name}</Nav.Link>
                    <Nav.Link onClick={logout}>
                      Logout
                    </Nav.Link>
                  </Nav>
                </div>
                :
                <div className="justify-content-end">
                  <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                  </Nav>
                </div>
                }
              </>
            }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;