import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({
  user,
  onLoggedOut,
  searchQuery,
  setSearchQuery,
  currentPath,
}) => {
  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
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
          {user && currentPath === "/profile" && (
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
          {user && currentPath !== "/profile" && (
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
    </Navbar>
  );
};
