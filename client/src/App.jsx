import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Outlet, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
  
    <div className="App">
      <>
        <Navbar color="light" expand="md">
          <Nav navbar>
            <NavbarBrand href="/">🐕‍🦺 🐩 DeShawn's Dog Walking</NavbarBrand>
            <NavItem>
              <NavLink href="/walkers">Walkers</NavLink>
            </NavItem>
            {location.pathname == "/" && (
              <NavItem>
                <NavLink href = "/add-dog"> Add Dog </NavLink>
              </NavItem>
            )}
          </Nav>
        </Navbar>
        <Outlet />
      </>
    </div>
  );
}

export default App;
