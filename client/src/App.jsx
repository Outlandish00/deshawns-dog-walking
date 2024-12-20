import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCities } from "./apiManager";

function App() {
  const location = useLocation();
const [selectedCityId, setSelectedCityId] = useState(0)
  const [cities, setAllCities] = useState([]);

  useEffect(() => {
    getCities().then(setAllCities)
  }, [])

  
  
  const handleChange = (event) => {
    setSelectedCityId(parseInt(event.target.value))
}


  return (
  
    <div className="App">
      <>
        <Navbar color="light" expand="md">
          <Nav navbar className="d-flex w-100">
            <NavbarBrand href="/">🐕‍🦺 🐩 DeShawn's Dog Walking</NavbarBrand>
            <NavItem>
              <NavLink href="/walkers">Walkers</NavLink>
            </NavItem>
            {location.pathname == "/" && (
              <NavItem>
                <NavLink href = "/add-dog"> Add Dog </NavLink>
              </NavItem>
            )}
            {location.pathname == "/walkers" && (
              <NavItem>
                <NavLink href = "/add-dog"> Add Dog </NavLink>
              </NavItem>
            )}
            {location.pathname == "/walkers" && (<NavItem className="ms-auto me-5"><select className="city-filter-select" onChange={handleChange}><option value="0"> Filter by city...</option>{cities.map((city) => {
            return <option value={city.id}>{city.name}</option>
})}</select></NavItem>)}
          </Nav>
        </Navbar>
        <Outlet context={{selectedCityId}} />
      </>
    </div>
  );
}

export default App;