import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{ color: 'white' }}>Esports Elevated</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/teams">Teams</Nav.Link>
            <Nav.Link as={Link} to="/tournaments">Tournaments</Nav.Link>
            <Nav.Link as={Link} to="/matches">Matches</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
