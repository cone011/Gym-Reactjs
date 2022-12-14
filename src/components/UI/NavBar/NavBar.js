import { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import AuthContext from "../../../store/auth-context";
import classes from "./Navbar.module.css";

const NavbarUI = (props) => {
  const authCtx = useContext(AuthContext);

  const logOutHandler = (eventKey) => {
    if (eventKey === "1") {
      authCtx.logout();
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      onSelect={logOutHandler}
      className={classes.navbar}
      sticky="top"
    >
      <Container>
        <Navbar.Brand href="/">Inicio</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/campaigns">Campañas</Nav.Link>
            <Nav.Link href="/task">Tareas</Nav.Link>
            <Nav.Link href="/list">Listas</Nav.Link>
            <NavDropdown title="Buscar" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/search/input">
                Buscar Listas
              </NavDropdown.Item>
              <NavDropdown.Item href="/search/email">
                Buscar Email
              </NavDropdown.Item>
              <NavDropdown.Item href="/search-date">
                Rango de Fecha Campañas
              </NavDropdown.Item>
            </NavDropdown>
            <button className="btn" onClick={authCtx.logout}>
              LogOut
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarUI;
