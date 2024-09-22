import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import styled from "styled-components";

import Home from "./Home";
import Shop from "./Shop";
import Cart from "./Cart";
import Checkout from "./Checkout";


const NavBar = styled.nav`
  background-color: #2c3e50;
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const NavList = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  margin-right: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    color: #ecf0f1;
  }
`;

const MainContent = styled.main`
  padding: 1rem;
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <NavBar>
          <NavList>
            <NavItem>
              <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/shop">Shop</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/cart">Cart</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/checkout">Checkout</NavLink>
            </NavItem>
          </NavList>
        </NavBar>

        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
};

export default App;
