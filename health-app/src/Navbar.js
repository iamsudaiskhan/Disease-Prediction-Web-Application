import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaStethoscope, FaUserCircle } from 'react-icons/fa';

function AppNavbar() {
  const navigate = useNavigate();
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('user'));
  } catch (e) {}

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/login');
    window.location.reload();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FaStethoscope className="me-2" />
          <strong>AI Health Web</strong>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar" className="justify-content-between">
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/predict">Check Symptoms</Nav.Link>
            <Nav.Link as={Link} to="/history">History</Nav.Link>
          </Nav>

          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-3">
                  <FaUserCircle /> {user.name}
                </Navbar.Text>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
