import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";

export const NavigationBar = ({ onLoggedOut, searchQuery, setSearchQuery }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && location.pathname !== "/" && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>

                <NavDropdown title="Settings" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={onLoggedOut}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
            {user && location.pathname === "/" && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>

                <NavDropdown title="Settings" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={onLoggedOut}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <input
                  type="text"
                  placeholder="Search by title or genre"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control search-bar"
                />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
