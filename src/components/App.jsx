import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import styled from "styled-components";

import Home from "./Home";
import Shop from "./Shop";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { useEffect, useState } from "react";

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
  background-color: black;
  color: white;
`;

const App = () => {
  // when app component mounts, hit the api and fetch both home page products and shop page products
  // dont fetch on demand, as it can cause network waterfall

  const [homePageProducts, setHomePageProducts] = useState([]);
  const [homePageIsLoading, setHomePageIsLoading] = useState(true);
  const [homePageError, setHomePageError] = useState(false);

  const [shopPageProducts, setShopPageProducts] = useState([]);
  const [shopPageIsLoading, setShopPageIsLoading] = useState(true);
  const [shopPageError, setShopPageError] = useState(false);

  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [homePageData, shopPageData] = await Promise.all([
        fetch("https://fakestoreapi.com/products?limit=3", { mode: "cors" }).then((res) =>
          res.json()
        ),
        fetch("https://fakestoreapi.com/products?limit=12", { mode: "cors" }).then((res) =>
          res.json()
        ),
      ]);

      setHomePageProducts(homePageData);
      setHomePageIsLoading(false);
      setHomePageError(false);

      setShopPageProducts(shopPageData.map((product) => ({ ...product, quantityOrdered: 0 })));
      setShopPageIsLoading(false);
      setShopPageError(false);
    };

    fetchData();
  }, []);

  const handleOrderChange = (id, newQuantity) => {
    setShopPageProducts((prevProducts) => (
      prevProducts.map((product) => product.id === id ? {...product, quantityOrdered: newQuantity} : product)
    ));

    setOrder((prevOrder) => {
      const orderContainsProduct = prevOrder.some((product) => product.id === id);
      let newOrder;

      if (orderContainsProduct) {
        newOrder = prevOrder.map((product) => product.id === id ? { ...product, quantityOrdered: newQuantity } : product);
        newOrder = newOrder.filter((product) => product.quantityOrdered > 0);
      } else {
        const newProduct = shopPageProducts.find((product) => product.id === id);
        newOrder = [...prevOrder, { ...newProduct, quantityOrdered: newQuantity }];
      }

      return newOrder;
    });
  };

  const homePageProps = {
    homePageProducts,
    homePageIsLoading,
    homePageError,
  };

  const shopPageProps = {
    shopPageProducts,
    shopPageIsLoading,
    shopPageError,
    handleOrderChange,
  };

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
              <NavLink to="/cart">Cart [{order.length}]</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/checkout">Checkout</NavLink>
            </NavItem>
          </NavList>
        </NavBar>

        <MainContent>
          <Routes>
            <Route path="/" element={<Home {...homePageProps} />} />
            <Route path="/shop" element={<Shop {...shopPageProps} />} />
            <Route path="/cart" element={<Cart order={order} />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
};

export default App;
